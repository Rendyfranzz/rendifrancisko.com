import { getAllProjects } from '@/lib/project';
import type { MetadataRoute } from 'next';

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rendifrancisko.com';

  const projects = await getAllProjects();
  const projectPost = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(project.date),
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
    },
  ];

  return [...staticRoutes, ...projectPost];
}
