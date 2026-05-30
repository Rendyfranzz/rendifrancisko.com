import {
	createCsrfMiddleware,
	createMiddleware,
	createStart,
} from "@tanstack/react-start";

const QUERY_PARAMS_TO_STRIP = ["_rsc", "__nextDataReq"];

const isHtmlRequest = (request: Request) => {
	const acceptHeader = request.headers.get("accept") ?? "";
	return acceptHeader.includes("text/html");
};

const stripParamsMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		if (!isHtmlRequest(request)) {
			return next();
		}

		const url = new URL(request.url);
		let shouldRedirect = false;

		for (const param of QUERY_PARAMS_TO_STRIP) {
			if (url.searchParams.has(param)) {
				url.searchParams.delete(param);
				shouldRedirect = true;
			}
		}

		return shouldRedirect ? Response.redirect(url.toString(), 301) : next();
	},
);

const csrfMiddleware = createCsrfMiddleware({
	filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
	requestMiddleware: [stripParamsMiddleware, csrfMiddleware],
}));
