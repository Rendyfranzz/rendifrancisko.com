import { createFileRoute } from "@tanstack/react-router";
import AnimateSection from "@/components/AnimateSection";
import CustomLink from "@/components/buttons/CustomLink";
import { ProjectCard } from "@/components/content/project/ProjectCard";
import HeroSection from "@/components/HeroSection";
import Reveal from "@/components/Reveal";
import UnstyledReveal from "@/components/UnstyledReveal";
import { getAllProjectsFn, getProjectViewsFn } from "@/lib/project.functions";
import type { ProjectMetadata } from "@/types/project";

export const Route = createFileRoute("/")({
	loader: async () => {
		const projects = await getAllProjectsFn({ data: { count: 3 } });
		const views = await getProjectViewsFn({
			data: { ids: projects.map((project) => project.id) },
		});
		return { projects, views };
	},
	head: () => ({
		meta: [
			{ title: "Rendi Francisko" },
			{
				name: "description",
				content:
					"Explore the online portfolio and blog of Rendi Dwi Francisko. Highlighting my projects and offering insights into web development practices.",
			},
			{ name: "robots", content: "index, follow" },
		],
		links: [{ rel: "canonical", href: "https://rendifrancisko.com/" }],
	}),
	component: Home,
});

function Home() {
	const { projects, views } = Route.useLoaderData();

	return (
		<>
			<HeroSection />
			<AnimateSection>
				<div className="layout min-h-main">
					<Reveal>
						<h2>Recent Projects</h2>
					</Reveal>
					<UnstyledReveal className="flex flex-col space-y-4 p-1">
						<ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
							{projects.map((project: ProjectMetadata) => (
								<ProjectCard
									key={project.id}
									project={project}
									views={views[project.id] ?? 0}
								/>
							))}
						</ul>
						<CustomLink
							href="/projects"
							className="p font-semibold border p-1 rounded-md w-fit hover:border-primary-500 hover:scale-105 transition-all duration-100 ease-in-out"
						>
							View All Projects
						</CustomLink>
					</UnstyledReveal>
				</div>
			</AnimateSection>
		</>
	);
}
