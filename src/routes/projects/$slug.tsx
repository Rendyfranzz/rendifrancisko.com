import { createFileRoute, notFound } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { TableOfContents } from "@/components/content/blog/TableOfContents";
import CustomImages from "@/components/images/CustomImages";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProjectBySlugFn } from "@/lib/project.functions";
import { ReportView } from "@/lib/views";

export const Route = createFileRoute("/projects/$slug")({
	loader: async ({ params }) => {
		try {
			const project = await getProjectBySlugFn({
				data: { slug: `${params.slug}.mdx` },
			});
			return { project };
		} catch {
			throw notFound();
		}
	},
	head: ({ loaderData, params }) => {
		const project = loaderData?.project;
		if (!project) {
			return {
				meta: [
					{ title: "Project not found" },
					{
						name: "description",
						content: "The requested project could not be located.",
					},
				],
			};
		}

		const keywords = project.meta.techStack
			.split(",")
			.map((item) => item.trim())
			.join(", ");

		return {
			meta: [
				{ title: project.meta.title },
				{ name: "description", content: project.meta.description },
				{ name: "keywords", content: keywords },
				{ property: "og:title", content: project.meta.title },
				{ property: "og:description", content: project.meta.description },
				{ property: "og:type", content: "article" },
				{
					property: "og:url",
					content: `https://rendifrancisko.com/projects/${params.slug}`,
				},
				{ property: "og:image", content: project.meta.thumbnail },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: project.meta.title },
				{ name: "twitter:description", content: project.meta.description },
				{ name: "twitter:image", content: project.meta.thumbnail },
			],
			links: [
				{
					rel: "canonical",
					href: `https://rendifrancisko.com/projects/${params.slug}`,
				},
			],
		};
	},
	component: ProjectDetailPage,
});

function ProjectDetailPage() {
	const { project } = Route.useLoaderData();
	const { meta, mdxHtml, headings } = project;
	const projectUrl = `https://rendifrancisko.com/projects/${Route.useParams().slug}`;

	const projectJsonLd = {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		headline: meta.title,
		name: meta.title,
		description: meta.description,
		url: projectUrl,
		datePublished: meta.date,
		image: meta.thumbnail,
		author: {
			"@type": "Person",
			name: "Rendi Dwi Francisko",
			url: "https://rendifrancisko.com",
		},
		keywords: meta.techStack.split(",").map((item) => item.trim()),
	};

	return (
		<>
			<TableOfContents headings={headings} />
			<ReportView slug={Route.useParams().slug} />
			<section className="layout">
				{meta.thumbnail != null && (
					<CustomImages
						src={meta.thumbnail}
						alt={meta.title}
						height={300}
						width={1200}
						className="rounded-lg w-full"
					/>
				)}
				<div className="mb-6 text-center">
					<h1 className="mb-1 text-3xl font-bold">{meta.title}</h1>
					<time dateTime={meta.date} className="text-sm text-slate-600">
						{format(parseISO(meta.date), "LLLL d, yyyy")}
					</time>
				</div>
				<div
					className="prose dark:prose-invert lg:prose-lg"
					/* biome-ignore lint/security/noDangerouslySetInnerHtml: MDX is rendered server-side from repository-owned content. */
					dangerouslySetInnerHTML={{ __html: mdxHtml }}
				/>
			</section>
			<JsonLd
				id={`project-${Route.useParams().slug}-structured-data`}
				data={projectJsonLd}
			/>
		</>
	);
}
