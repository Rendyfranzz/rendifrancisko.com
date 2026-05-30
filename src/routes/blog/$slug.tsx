import { createFileRoute, notFound } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { TableOfContents } from "@/components/content/blog/TableOfContents";
import CustomImages from "@/components/images/CustomImages";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBlogBySlugFn } from "@/lib/blog.functions";

export const Route = createFileRoute("/blog/$slug")({
	loader: async ({ params }) => {
		try {
			const blog = await getBlogBySlugFn({
				data: { slug: `${params.slug}.mdx` },
			});
			return { blog };
		} catch {
			throw notFound();
		}
	},
	head: ({ loaderData, params }) => {
		const blog = loaderData?.blog;
		if (!blog) {
			return {
				meta: [
					{ title: "Blog post not found" },
					{
						name: "description",
						content: "The requested blog post could not be located.",
					},
				],
			};
		}

		const keywords = blog.meta.tags
			.split(",")
			.map((item) => item.trim())
			.join(", ");

		return {
			meta: [
				{ title: blog.meta.title },
				{ name: "description", content: blog.meta.description },
				{ name: "keywords", content: keywords },
				{ property: "og:title", content: blog.meta.title },
				{ property: "og:description", content: blog.meta.description },
				{ property: "og:type", content: "article" },
				{
					property: "og:url",
					content: `https://rendifrancisko.com/blog/${params.slug}`,
				},
				{ property: "og:image", content: blog.meta.thumbnail },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: blog.meta.title },
				{ name: "twitter:description", content: blog.meta.description },
				{ name: "twitter:image", content: blog.meta.thumbnail },
			],
			links: [
				{
					rel: "canonical",
					href: `https://rendifrancisko.com/blog/${params.slug}`,
				},
			],
		};
	},
	component: BlogDetailPage,
});

function BlogDetailPage() {
	const { blog } = Route.useLoaderData();
	const { meta, mdxHtml, headings } = blog;
	const blogUrl = `https://rendifrancisko.com/blog/${Route.useParams().slug}`;

	const blogJsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: meta.title,
		name: meta.title,
		description: meta.description,
		url: blogUrl,
		datePublished: meta.date,
		image: meta.thumbnail,
		author: {
			"@type": "Person",
			name: "Rendi Dwi Francisko",
			url: "https://rendifrancisko.com",
		},
		keywords: meta.tags.split(",").map((item) => item.trim()),
		articleSection: "Technology",
		inLanguage: "en-US",
	};

	return (
		<>
			<TableOfContents headings={headings} />
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
					<div className="mt-2 flex flex-wrap justify-center gap-1">
						{meta.tags.split(",").map((tag) => (
							<span
								key={tag}
								className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full"
							>
								{tag.trim()}
							</span>
						))}
					</div>
				</div>
				<div
					className="prose dark:prose-invert lg:prose-lg"
					/* biome-ignore lint/security/noDangerouslySetInnerHtml: MDX is rendered server-side from repository-owned content. */
					dangerouslySetInnerHTML={{ __html: mdxHtml }}
				/>
			</section>
			<JsonLd
				id={`blog-${Route.useParams().slug}-structured-data`}
				data={blogJsonLd}
			/>
		</>
	);
}
