import fs from 'fs';
import path from 'path';

import CustomImage from '@/components/CustomImage';
import { Project, ProjectMetadata } from '@/types/project';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

export async function getProjectBySlug(slug: string): Promise<Project> {
  const filePath = path.join(process.cwd(), 'src/contents/project', slug);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const { frontmatter, content } = await compileMDX<ProjectMetadata>({
    source: fileContent,
    components: {
      CustomImage,
    },
    options: {
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
    },
  });
  // const mdx = await serialize(content, {
  //   parseFrontmatter: true,
  //   mdxOptions: {
  //     rehypePlugins: [
  //       rehypeHighlight,
  //       rehypeSlug,
  //       [
  //         rehypeAutolinkHeadings,
  //         {
  //           behavior: 'wrap',
  //         },
  //       ],
  //     ],
  //   },
  // });

  const id = slug.replace(/\.mdx$/, '');

  return {
    meta: {
      ...frontmatter,
      id,
    },
    mdxSource: content,
  };
}

interface getAllProjectsProps {
  count?: number;
}

export async function getAllProjects({
  count,
}: getAllProjectsProps = {}): Promise<ProjectMetadata[]> {
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

  const result = project.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return count ? result.slice(0, count) : result;
}
