import { createFileRoute } from "@tanstack/react-router";
import { Redis } from "@upstash/redis";

const getRequestIp = (request: Request) => {
	const forwarded = request.headers.get("x-forwarded-for");
	if (forwarded) {
		return forwarded.split(",")[0]?.trim();
	}
	return request.headers.get("x-real-ip");
};

const hasRedisEnv = () =>
	Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
	Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

export const Route = createFileRoute("/api/incr")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const contentType = request.headers.get("content-type") ?? "";

				if (!contentType.includes("application/json")) {
					return new Response("must be json", { status: 400 });
				}

				const body = await request.json();
				const slug = typeof body.slug === "string" ? body.slug : undefined;

				if (!slug) {
					return new Response("Slug not found", { status: 400 });
				}

				if (!hasRedisEnv()) {
					return new Response(null, { status: 202 });
				}

				const redis = Redis.fromEnv();
				const ip = getRequestIp(request);
				if (ip) {
					const buf = await crypto.subtle.digest(
						"SHA-256",
						new TextEncoder().encode(ip),
					);
					const hash = Array.from(new Uint8Array(buf))
						.map((b) => b.toString(16).padStart(2, "0"))
						.join("");

					const isNew = await redis.set(
						["deduplicate", hash, slug].join(":"),
						true,
						{
							nx: true,
							ex: 24 * 60 * 60,
						},
					);

					if (!isNew) {
						return new Response(null, { status: 202 });
					}
				}

				await redis.incr(["pageviews", "projects", slug].join(":"));
				return new Response(null, { status: 202 });
			},
		},
	},
});
