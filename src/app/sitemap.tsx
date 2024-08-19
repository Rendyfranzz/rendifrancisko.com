import { getAllProjects } from '@/lib/project';

export default async function Sitemap() {
  const baseUrl = 'https://rendifrancisko.com';

  const projects = await getAllProjects();
  const projectPost = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
  }));
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...projectPost,
  ];
}
