import { createFileRoute } from "@tanstack/react-router";
import { getAllProjects } from "@/lib/project.server";

const toSitemapEntry = (url: string, lastModified?: string) => {
	return `\n  <url>\n    <loc>${url}</loc>${lastModified ? `\n    <lastmod>${lastModified}</lastmod>` : ""}\n  </url>`;
};

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: async () => {
				const baseUrl = "https://rendifrancisko.com";
				const projects = await getAllProjects();

				const staticEntries = [
					toSitemapEntry(baseUrl, new Date().toISOString()),
					toSitemapEntry(`${baseUrl}/about`, new Date().toISOString()),
					toSitemapEntry(`${baseUrl}/projects`, new Date().toISOString()),
				];

				const projectEntries = projects.map((project) =>
					toSitemapEntry(
						`${baseUrl}/projects/${project.id}`,
						new Date(project.date).toISOString(),
					),
				);

				const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...staticEntries, ...projectEntries].join("")}\n</urlset>`;

				return new Response(body, {
					headers: {
						"Content-Type": "application/xml",
					},
				});
			},
		},
	},
});
