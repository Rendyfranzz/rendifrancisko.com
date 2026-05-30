import fs from "node:fs";
import path from "node:path";
import { Redis } from "@upstash/redis";
import matter from "gray-matter";
import type { Project, ProjectMetadata } from "@/types/project";
import { renderMdxToHtml } from "./mdx.server";

interface Heading {
	id: string;
	text: string;
	level: number;
}

function extractHeadings(content: string): Heading[] {
	const headings: Heading[] = [];
	const headingRegex = /^(#{2,4})\s+(.+)$/gm;

	for (const match of content.matchAll(headingRegex)) {
		const marker = match[1];
		const heading = match[2];
		if (!marker || !heading) continue;

		const level = marker.length;
		const text = heading.trim();
		const id = text
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^\w-]/g, "");
		headings.push({ id, text, level });
	}

	return headings;
}

export async function getProjectBySlug(
	slug: string,
): Promise<Project & { headings: Heading[] }> {
	const filePath = path.join(process.cwd(), "src/contents/project", slug);
	const fileContent = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(fileContent);

	const headings = extractHeadings(content);
	const mdxHtml = await renderMdxToHtml(content);
	const id = slug.replace(/\.mdx$/, "");

	return {
		meta: {
			...(data as ProjectMetadata),
			id,
		},
		mdxHtml,
		headings,
	};
}

interface getAllProjectsProps {
	count?: number;
}

const emptyViews = (ids: string[]) =>
	ids.reduce<Record<string, number>>((acc, id) => {
		acc[id] = 0;
		return acc;
	}, {});

const hasRedisEnv = () =>
	Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
	Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

export async function getAllProjects({
	count,
}: getAllProjectsProps = {}): Promise<ProjectMetadata[]> {
	const filePath = path.join(process.cwd(), "src/contents/project");
	const files = fs
		.readdirSync(filePath)
		.filter((file) => file.endsWith(".mdx"));

	const project: ProjectMetadata[] = [];

	for (const file of files) {
		const post = await getProjectBySlug(file);
		if (post) {
			const { meta } = post;
			project.push(meta);
		}
	}

	const result = project.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	return count ? result.slice(0, count) : result;
}

export async function getProjectViews(ids: string[]) {
	if (!hasRedisEnv()) {
		return emptyViews(ids);
	}

	try {
		const redis = Redis.fromEnv();
		return (
			await redis.mget<number[]>(
				...ids.map((id) => ["pageviews", "projects", id].join(":")),
			)
		).reduce(
			(acc, value, index) => {
				const id = ids[index];
				if (id) {
					acc[id] = value ?? 0;
				}
				return acc;
			},
			{} as Record<string, number>,
		);
	} catch (error) {
		console.warn("Unable to load project views from Redis:", error);
		return emptyViews(ids);
	}
}
