import { TableOfContents } from '@/components/content/blog/TableOfContents';
import CustomImages from '@/components/images/CustomImages';
import { Layout } from '@/components/layout/Layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllBlogs, getBlogBySlug } from '@/lib/blog';
import { format, parseISO } from 'date-fns';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(props: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const params = await props.params;
  try {
    const blog = await getBlogBySlug((params.slug as string) + '.mdx');
    if (!blog) {
      return {
        title: 'Blog post not found',
        description: 'The requested blog post could not be located.',
      };
    }
    const keywords = blog.meta.tags.split(',').map((item) => item.trim());
    return {
      title: blog.meta.title,
      description: blog.meta.description,
      alternates: {
        canonical: `/blog/${params.slug}`,
      },
      openGraph: {
        title: blog.meta.title,
        description: blog.meta.description,
        url: `/blog/${params.slug}`,
        type: 'article',
        publishedTime: blog.meta.date,
        images: [
          {
            url: blog.meta.thumbnail,
            width: 1200,
            height: 630,
            alt: blog.meta.title,
          },
        ],
      },
      twitter: {
        title: blog.meta.title,
        description: blog.meta.description,
        card: 'summary_large_image',
        images: {
          url: blog.meta.thumbnail,
          width: 1200,
          height: 630,
          alt: blog.meta.title,
        },
      },
      keywords,
      authors: [
        { name: 'Rendi Dwi Francisko', url: 'https://rendifrancisko.com' },
      ],
      creator: 'Rendi Dwi Francisko',
      publisher: 'Rendi Dwi Francisko',
      robots: {
        index: false,
        follow: true,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: '404 - Page Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }
}

export default async function Index({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug((slug as string) + '.mdx');

  const { meta, mdxSource, headings } = blog;
  const blogUrl = `https://rendifrancisko.com/blog/${slug}`;
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    name: meta.title,
    description: meta.description,
    url: blogUrl,
    datePublished: meta.date,
    image: meta.thumbnail,
    author: {
      '@type': 'Person',
      name: 'Rendi Dwi Francisko',
      url: 'https://rendifrancisko.com',
    },
    keywords: meta.tags.split(',').map((item) => item.trim()),
    articleSection: 'Technology',
    inLanguage: 'en-US',
  };

  return (
    <Layout>
      <TableOfContents headings={headings} />
      <section className='layout'>
        {meta.thumbnail != null && (
          <CustomImages
            src={meta.thumbnail}
            alt={meta.title}
            height={300}
            width={1200}
            className='rounded-lg w-full'
          />
        )}
        <div className='mb-6 text-center'>
          <h1 className='mb-1 text-3xl font-bold'>{meta.title}</h1>
          <time dateTime={meta.date} className='text-sm text-slate-600'>
            {format(parseISO(meta.date), 'LLLL d, yyyy')}
          </time>
          <div className='mt-2 flex flex-wrap justify-center gap-1'>
            {meta.tags.split(',').map((tag) => (
              <span
                key={tag}
                className='text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full'
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
        <div className='prose dark:prose-invert lg:prose-lg'>{mdxSource}</div>
      </section>
      <JsonLd data={blogJsonLd} />
    </Layout>
  );
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  if (!blogs) return [];
  return blogs.map((blog) => ({
    slug: blog.id as string,
  }));
}
