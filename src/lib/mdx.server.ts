import { compile, run } from "@mdx-js/mdx";
import { createElement } from "react";
import * as runtime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

export async function renderMdxToHtml(source: string) {
	const compiled = await compile(source, {
		outputFormat: "function-body",
		rehypePlugins: [
			rehypeHighlight,
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "wrap",
				},
			],
		],
	});

	const { default: Content } = await run(String(compiled), runtime);
	return renderToStaticMarkup(createElement(Content));
}
