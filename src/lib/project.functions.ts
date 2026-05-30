import { createServerFn } from "@tanstack/react-start";
import {
	getAllProjects,
	getProjectBySlug,
	getProjectViews,
} from "./project.server";

export const getAllProjectsFn = createServerFn({ method: "GET" })
	.inputValidator((data: { count?: number } | undefined) => data)
	.handler(async ({ data }) => getAllProjects({ count: data?.count }));

export const getProjectBySlugFn = createServerFn({ method: "GET" })
	.inputValidator((data: { slug: string }) => data)
	.handler(async ({ data }) => getProjectBySlug(data.slug));

export const getProjectViewsFn = createServerFn({ method: "POST" })
	.inputValidator((data: { ids: string[] }) => data)
	.handler(async ({ data }) => getProjectViews(data.ids));
