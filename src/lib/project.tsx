import fs from 'fs';
import path from 'path';

import { Project, ProjectMetadata } from '@/types/project';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

export async function getProjectBySlug(slug: string): Promise<Project> {
  const filePath = path.join(process.cwd(), 'src/contents/project', slug);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const { content, data } = matter(fileContent);
  const mdx = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [
        rehypeHighlight,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
          },
        ],
      ],
    },
  });

  const id = slug.replace(/\.mdx$/, '');

  return {
    meta: {
      id,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail,
      date: data.date,
      techStack: data.techStack,
    },
    mdxSource: mdx,
  };
}

export async function getAllProjects(): Promise<ProjectMetadata[]> {
  const filePath = path.join(process.cwd(), 'src/contents/project');
  const files = fs
    .readdirSync(filePath)
    .filter((file) => file.endsWith('.mdx'));

  const project: ProjectMetadata[] = [];

  for (const file of files) {
    const post = await getProjectBySlug(file);
    if (post) {
      const { meta } = post;
      project.push(meta);
    }
  }

  return project.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
