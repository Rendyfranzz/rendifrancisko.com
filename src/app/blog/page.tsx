import Accent from '@/components/Accent';
import AnimateDiv from '@/components/AnimateDiv';
import Reveal from '@/components/Reveal';
import { BlogCard } from '@/components/content/blog/BlogCard';
import { Layout } from '@/components/layout/Layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllBlogs } from '@/lib/blog';
import { BlogMetadata } from '@/types/blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read articles and insights on web development, programming, and technology by Rendi Francisko.',
  keywords: [
    'Rendi Francisko blog',
    'web development articles',
    'programming tutorials',
    'Next.js blog',
    'React tutorials',
  ],
  alternates: {
    canonical: '/blog',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Blog | Rendi Francisko',
    description:
      'Read articles and insights on web development, programming, and technology by Rendi Francisko.',
    type: 'website',
    url: '/blog',
  },
  twitter: {
    title: 'Blog | Rendi Francisko',
    description:
      'Read articles and insights on web development, programming, and technology by Rendi Francisko.',
  },
};

export default async function index() {
  const mdxSources: BlogMetadata[] = await getAllBlogs();

  const blogsItemList = mdxSources.map((blog, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `https://rendifrancisko.com/blog/${blog.id}`,
    name: blog.title,
    description: blog.description,
  }));

  const blogsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Rendi Francisko Blog',
    itemListElement: blogsItemList,
  };

  return (
    <Layout>
      <section className={`layout`}>
        <Reveal>
          <Accent className='text-3xl font-bold '>Blog</Accent>
        </Reveal>
        <Reveal>
          <p>
            Welcome to my blog where I share articles, tutorials, and insights
            on web development, programming, and technology. I write about my
            learning journey and practical tips for developers.
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
          initial='hidden'
          animate='show'
          transition={{ duration: 0.55, delay: 0.5 }}
        >
          <ul className='mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {mdxSources.map((blog: BlogMetadata, idx: number) => (
              <BlogCard key={idx} blog={blog} />
            ))}
          </ul>
        </AnimateDiv>
      </section>
      <JsonLd data={blogsJsonLd} />
    </Layout>
  );
}
