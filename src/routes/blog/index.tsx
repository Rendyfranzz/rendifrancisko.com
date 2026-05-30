import { createFileRoute } from "@tanstack/react-router";
import Accent from "@/components/Accent";
import AnimateDiv from "@/components/AnimateDiv";
import { BlogCard } from "@/components/content/blog/BlogCard";
import Reveal from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllBlogsFn } from "@/lib/blog.functions";
import type { BlogMetadata } from "@/types/blog";

export const Route = createFileRoute("/blog/")({
	loader: async () => {
		const blogs = await getAllBlogsFn();
		return { blogs };
	},
	head: () => ({
		meta: [
			{ title: "Blog | Rendi Francisko" },
			{
				name: "description",
				content:
					"Read articles and insights on web development, programming, and technology by Rendi Francisko.",
			},
			{
				name: "keywords",
				content:
					"Rendi Francisko blog, web development articles, programming tutorials, Next.js blog, React tutorials",
			},
			{ name: "robots", content: "index, follow" },
			{ property: "og:title", content: "Blog | Rendi Francisko" },
			{
				property: "og:description",
				content:
					"Read articles and insights on web development, programming, and technology by Rendi Francisko.",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: "https://rendifrancisko.com/blog" },
			{ name: "twitter:title", content: "Blog | Rendi Francisko" },
			{
				name: "twitter:description",
				content:
					"Read articles and insights on web development, programming, and technology by Rendi Francisko.",
			},
		],
		links: [{ rel: "canonical", href: "https://rendifrancisko.com/blog" }],
	}),
	component: BlogPage,
});

function BlogPage() {
	const { blogs } = Route.useLoaderData();

	const blogsItemList = blogs.map((blog: BlogMetadata, index: number) => ({
		"@type": "ListItem",
		position: index + 1,
		url: `https://rendifrancisko.com/blog/${blog.id}`,
		name: blog.title,
		description: blog.description,
	}));

	const blogsJsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Rendi Francisko Blog",
		itemListElement: blogsItemList,
	};

	return (
		<>
			<section className="layout">
				<Reveal>
					<Accent className="text-3xl font-bold ">Blog</Accent>
				</Reveal>
				<Reveal>
					<p>
						Welcome to my blog where I share articles, tutorials, and insights
						on web development, programming, and technology. I write about my
						learning journey and practical tips for developers.
					</p>
				</Reveal>
				<AnimateDiv
					variants={{
						hidden: { opacity: 0, y: 50 },
						show: {
							y: 0,
							opacity: 1,
						},
					}}
					initial="hidden"
					animate="show"
					transition={{ duration: 0.55, delay: 0.5 }}
				>
					<ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{blogs.map((blog: BlogMetadata) => (
							<BlogCard key={blog.id} blog={blog} />
						))}
					</ul>
				</AnimateDiv>
			</section>
			<JsonLd id="blogs-item-list" data={blogsJsonLd} />
		</>
	);
}
