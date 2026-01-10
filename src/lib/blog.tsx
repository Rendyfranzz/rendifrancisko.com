import fs from 'fs';
import path from 'path';

import CustomImage from '@/components/CustomImage';
import { Blog, BlogMetadata } from '@/types/blog';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    headings.push({ id, text, level });
  }

  return headings;
}

export async function getBlogBySlug(
  slug: string,
): Promise<Blog & { headings: Heading[] }> {
  const filePath = path.join(process.cwd(), 'src/contents/blog', slug);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const headings = extractHeadings(fileContent);

  const { frontmatter, content } = await compileMDX<BlogMetadata>({
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

  const id = slug.replace(/\.mdx$/, '');

  return {
    meta: {
      ...frontmatter,
      id,
    },
    mdxSource: content,
    headings,
  };
}

interface GetAllBlogsProps {
  count?: number;
}

export async function getAllBlogs({
  count,
}: GetAllBlogsProps = {}): Promise<BlogMetadata[]> {
  const filePath = path.join(process.cwd(), 'src/contents/blog');
  const files = fs
    .readdirSync(filePath)
    .filter((file) => file.endsWith('.mdx'));

  const blogs: BlogMetadata[] = [];

  for (const file of files) {
    const post = await getBlogBySlug(file);
    if (post) {
      const { meta } = post;
      blogs.push(meta);
    }
  }

  const result = blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return count ? result.slice(0, count) : result;
}
