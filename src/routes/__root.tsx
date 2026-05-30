import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Layout } from "@/components/layout/Layout";
import ProgressBarProvider from "@/components/ProgressBarProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Rendi Francisko",
			},
			{
				name: "application-name",
				content: "Rendi Francisko Portfolio",
			},
			{
				name: "description",
				content:
					"Explore the online portfolio and blog of Rendi Dwi Francisko. Highlighting my projects and offering insights into web development practices.",
			},
			{
				name: "keywords",
				content:
					"Rendi Francisko, Rendi Dwi Francisko, Software Engineer, Full Stack Developer, Frontend Developer, Backend Developer, JavaScript Portfolio, Indonesia Developer",
			},
			{
				name: "author",
				content: "Rendi Dwi Francisko",
			},
			{
				name: "creator",
				content: "Rendi Dwi Francisko",
			},
			{
				name: "publisher",
				content: "Rendi Dwi Francisko",
			},
			{
				name: "robots",
				content: "index, follow",
			},
			{
				name: "referrer",
				content: "origin-when-cross-origin",
			},
			{
				name: "theme-color",
				content: "#0a0a0a",
			},
			{
				property: "og:title",
				content: "Rendi Francisko",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:url",
				content: "https://rendifrancisko.com",
			},
			{
				property: "og:site_name",
				content: "Rendi Francisko",
			},
			{
				property: "og:description",
				content:
					"Explore the online portfolio and blog of Rendi Dwi Francisko. Highlighting my projects and offering insights into web development practices.",
			},
			{
				property: "og:image",
				content: "https://rendifrancisko.com/api/og",
			},
			{
				property: "og:image:secure_url",
				content: "https://rendifrancisko.com/api/og",
			},
			{
				property: "og:image:type",
				content: "image/png",
			},
			{
				property: "og:image:width",
				content: "1200",
			},
			{
				property: "og:image:height",
				content: "630",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: "Rendi Francisko",
			},
			{
				name: "twitter:description",
				content:
					"Explore the online portfolio and blog of Rendi Dwi Francisko. Highlighting my projects and offering insights into web development practices.",
			},
			{
				name: "twitter:image:src",
				content: "https://rendifrancisko.com/api/og",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
			},
			{
				rel: "icon",
				href: "/icon.png",
			},
			{
				rel: "shortcut icon",
				href: "/favicon.ico",
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-icon.png",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
			{
				rel: "canonical",
				href: "https://rendifrancisko.com",
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const structuredData = [
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: "Rendi Francisko",
			url: "https://rendifrancisko.com",
			alternateName: "Rendi Dwi Francisko Portfolio",
			potentialAction: {
				"@type": "SearchAction",
				target: {
					"@type": "EntryPoint",
					urlTemplate: "https://rendifrancisko.com/blog?q={search_term_string}",
				},
				"query-input": "required name=search_term_string",
			},
		},
		{
			"@context": "https://schema.org",
			"@type": "Person",
			name: "Rendi Dwi Francisko",
			url: "https://rendifrancisko.com",
			jobTitle: "Software Engineer",
			description:
				"Software engineer and full stack developer specializing in modern web applications.",
			image: "https://rendifrancisko.com/icon.png",
			sameAs: [
				"https://www.linkedin.com/in/rendi-dwi-francisko/",
				"https://github.com/Rendyfranzz",
				"mailto:rendidwifrans@gmail.com",
			],
			worksFor: {
				"@type": "Organization",
				name: "Rendi Francisko",
			},
		},
	];

	return (
		<html lang="en" className="scroll-smooth!" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen flex flex-col transition-colors bg-background text-foreground antialiased">
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only absolute left-4 top-4 z-1000 rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition focus:outline-hidden"
				>
					Skip to main content
				</a>
				<ProgressBarProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<Layout>{children}</Layout>
					</ThemeProvider>
				</ProgressBarProvider>
				<JsonLd id="global-structured-data" data={structuredData} />
				<SpeedInsights />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
