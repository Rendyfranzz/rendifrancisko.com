import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
	server: {
		handlers: {
			GET: () => {
				const baseUrl = "https://rendifrancisko.com";
				const body = [
					"User-agent: *",
					"Allow: /",
					`Sitemap: ${baseUrl}/sitemap.xml`,
					`Host: ${baseUrl}`,
					"",
				].join("\n");

				return new Response(body, {
					headers: {
						"Content-Type": "text/plain",
					},
				});
			},
		},
	},
});
