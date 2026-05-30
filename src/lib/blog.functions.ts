import { createServerFn } from "@tanstack/react-start";
import { getAllBlogs, getBlogBySlug } from "./blog.server";

export const getAllBlogsFn = createServerFn({ method: "GET" })
	.inputValidator((data: { count?: number } | undefined) => data)
	.handler(async ({ data }) => getAllBlogs({ count: data?.count }));

export const getBlogBySlugFn = createServerFn({ method: "GET" })
	.inputValidator((data: { slug: string }) => data)
	.handler(async ({ data }) => getBlogBySlug(data.slug));
