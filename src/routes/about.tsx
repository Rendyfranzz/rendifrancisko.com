import { createFileRoute } from "@tanstack/react-router";
import Accent from "@/components/Accent";
import Reveal from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";

export const Route = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: "About | Rendi Francisko" },
			{
				name: "description",
				content:
					"Learn more about Rendi Dwi Francisko, a software engineer focused on modern web development using Next.js, TypeScript, and Go.",
			},
			{
				name: "keywords",
				content:
					"About Rendi Francisko, Software engineer profile, Full stack developer Indonesia",
			},
			{ property: "og:title", content: "About | Rendi Francisko" },
			{
				property: "og:description",
				content:
					"Background, skills, and experience of Rendi Dwi Francisko, a software engineer based in Indonesia.",
			},
			{ property: "og:type", content: "profile" },
			{ property: "og:url", content: "https://rendifrancisko.com/about" },
			{ name: "twitter:title", content: "About | Rendi Francisko" },
			{
				name: "twitter:description",
				content:
					"Background, skills, and experience of Rendi Dwi Francisko, a software engineer based in Indonesia.",
			},
		],
		links: [{ rel: "canonical", href: "https://rendifrancisko.com/about" }],
	}),
	component: AboutPage,
});

function AboutPage() {
	const aboutJsonLd = {
		"@context": "https://schema.org",
		"@type": "AboutPage",
		name: "About Rendi Dwi Francisko",
		description:
			"Background, skills, and experience of software engineer Rendi Dwi Francisko.",
		mainEntity: {
			"@type": "Person",
			name: "Rendi Dwi Francisko",
			url: "https://rendifrancisko.com",
		},
	};

	return (
		<>
			<section className="layout py-20">
				<div className="max-w-3xl mx-auto">
					<Reveal className="mx-auto">
						<div className="flex flex-col items-center text-center mb-16">
							<span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-6 border border-primary-500/20">
								About Me
							</span>
							<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
								My name is{" "}
								<span className="relative">
									<Accent className="">Rendi</Accent>
									<span className="absolute -bottom-2 left-0 right-0 h-3 bg-primary-500/20 rounded-full" />
								</span>{" "}
								Dwi Francisko
							</h1>
						</div>
					</Reveal>

					<div className="space-y-8">
						<Reveal width="w-full">
							<p className="text-lg md:text-xl leading-relaxed text-muted-foreground text-center">
								I am a graduate of{" "}
								<span className="font-medium text-foreground">
									Informatics Engineering from Sepuluh Nopember Institute of
									Technology
								</span>
								. My journey started with exploring various technologies, which
								quickly led me to work on several projects. Over time, I focused
								on web development specializing in Frontend and Backend.
							</p>
						</Reveal>

						<Reveal width="w-full">
							<ul className="grid gap-6 sm:grid-cols-2 my-12">
								<li className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary-500/30 transition-colors duration-300">
									<h3 className="font-semibold text-lg mb-3">Frontend</h3>
									<p className="text-muted-foreground text-sm">
										JavaScript, React, Next.js, TypeScript, Tailwind CSS
									</p>
								</li>
								<li className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary-500/30 transition-colors duration-300">
									<h3 className="font-semibold text-lg mb-3">Backend</h3>
									<p className="text-muted-foreground text-sm">
										Go, Express JS, Restify JS, PostgreSQL, Redis
									</p>
								</li>
							</ul>
						</Reveal>

						<Reveal width="w-full">
							<p className="text-lg md:text-xl leading-relaxed text-muted-foreground text-center">
								On this page, I showcase some of the projects I have been
								involved in, reflecting my growth and experiences in the field.
								If you&apos;d like to discuss anything or share your thoughts,
								feedback, or suggestions, please feel free to get in touch. I am
								always open to new conversations and collaborations.{" "}
								<span className="text-foreground font-medium">
									I look forward to hearing from you!
								</span>
							</p>
						</Reveal>
					</div>
				</div>
			</section>
			<JsonLd id="about-structured-data" data={aboutJsonLd} />
		</>
	);
}
