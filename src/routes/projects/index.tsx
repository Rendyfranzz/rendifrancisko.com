import { createFileRoute } from "@tanstack/react-router";
import Accent from "@/components/Accent";
import AnimateDiv from "@/components/AnimateDiv";
import { ProjectCard } from "@/components/content/project/ProjectCard";
import Reveal from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllProjectsFn, getProjectViewsFn } from "@/lib/project.functions";
import type { ProjectMetadata } from "@/types/project";

export const Route = createFileRoute("/projects/")({
	loader: async () => {
		const projects = await getAllProjectsFn();
		const views = await getProjectViewsFn({
			data: { ids: projects.map((project) => project.id) },
		});
		return { projects, views };
	},
	head: () => ({
		meta: [
			{ title: "Projects | Rendi Francisko" },
			{
				name: "description",
				content:
					"Browse highlighted software projects by Rendi Dwi Francisko, covering web applications, frontend experiences, and backend services.",
			},
			{
				name: "keywords",
				content:
					"Rendi Francisko projects, Web development portfolio, Next.js case studies",
			},
			{ name: "robots", content: "index, follow" },
			{ property: "og:title", content: "Projects | Rendi Francisko" },
			{
				property: "og:description",
				content:
					"Explore development projects delivered by Rendi Dwi Francisko, including web applications and modern user experiences.",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: "https://rendifrancisko.com/projects" },
			{ name: "twitter:title", content: "Projects | Rendi Francisko" },
			{
				name: "twitter:description",
				content:
					"Explore development projects delivered by Rendi Dwi Francisko, including web applications and modern user experiences.",
			},
		],
		links: [{ rel: "canonical", href: "https://rendifrancisko.com/projects" }],
	}),
	component: ProjectsPage,
});

function ProjectsPage() {
	const { projects, views } = Route.useLoaderData();

	const projectsItemList = projects.map((project: ProjectMetadata, index) => ({
		"@type": "ListItem",
		position: index + 1,
		url: `https://rendifrancisko.com/projects/${project.id}`,
		name: project.title,
		description: project.description,
	}));

	const projectsJsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Rendi Francisko Projects",
		itemListElement: projectsItemList,
	};

	return (
		<>
			<section className="layout">
				<Reveal>
					<Accent className="text-3xl font-bold ">Projects</Accent>
				</Reveal>
				<Reveal>
					<p>
						Here are some of the projects that I have worked on. I have
						experience in building websites using modern frontend technologies
						and frameworks.
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
						{projects.map((project: ProjectMetadata) => (
							<ProjectCard
								key={project.id}
								project={project}
								views={views[project.id] ?? 0}
							/>
						))}
					</ul>
				</AnimateDiv>
			</section>
			<JsonLd id="projects-item-list" data={projectsJsonLd} />
		</>
	);
}
