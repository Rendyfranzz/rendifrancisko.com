import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Blog, BlogMetadata } from "@/types/blog";
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

export async function getBlogBySlug(
	slug: string,
): Promise<Blog & { headings: Heading[] }> {
	const filePath = path.join(process.cwd(), "src/contents/blog", slug);
	const fileContent = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(fileContent);

	const headings = extractHeadings(content);
	const mdxHtml = await renderMdxToHtml(content);
	const id = slug.replace(/\.mdx$/, "");

	return {
		meta: {
			...(data as BlogMetadata),
			id,
		},
		mdxHtml,
		headings,
	};
}

interface GetAllBlogsProps {
	count?: number;
}

export async function getAllBlogs({
	count,
}: GetAllBlogsProps = {}): Promise<BlogMetadata[]> {
	const filePath = path.join(process.cwd(), "src/contents/blog");
	const files = fs
		.readdirSync(filePath)
		.filter((file) => file.endsWith(".mdx"));

	const blogs: BlogMetadata[] = [];

	for (const file of files) {
		const post = await getBlogBySlug(file);
		if (post) {
			const { meta } = post;
			blogs.push(meta);
		}
	}

	const result = blogs.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	return count ? result.slice(0, count) : result;
}
