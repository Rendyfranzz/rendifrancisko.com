import CustomImages from '@/components/images/CustomImages';
import { Layout } from '@/components/layout/Layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllProjects, getProjectBySlug } from '@/lib/project';
import { ReportView } from '@/lib/views';
import { format, parseISO } from 'date-fns';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  try {
    const project = await getProjectBySlug((params?.slug as string) + '.mdx');
    if (!project) {
      return {
        title: 'Project not found',
        description: 'The requested project could not be located.',
      };
    }
    const keywords = project.meta.techStack
      .split(',')
      .map((item) => item.trim());
    return {
      title: project.meta.title,
      description: project.meta.description,
      alternates: {
        canonical: `/projects/${params.slug}`,
      },
      openGraph: {
        title: project.meta.title,
        description: project.meta.description,
        url: `/projects/${params.slug}`,
        type: 'article',
        publishedTime: project.meta.date,
        images: [
          {
            url: project.meta.thumbnail,
            width: 1200,
            height: 630,
            alt: project.meta.title,
          },
        ],
      },
      twitter: {
        title: project.meta.title,
        description: project.meta.description,
        card: 'summary_large_image',
        images: {
          url: project.meta.thumbnail,
          width: 1200,
          height: 630,
          alt: project.meta.title,
        },
      },
      keywords,
      authors: [
        { name: 'Rendi Dwi Francisko', url: 'https://rendifrancisko.com' },
      ],
      creator: 'Rendi Dwi Francisko',
      publisher: 'Rendi Dwi Francisko',
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
  params: {
    slug: string;
  };
}) {
  const project = await getProjectBySlug((params?.slug as string) + '.mdx');

  const { meta, mdxSource } = project;
  const projectUrl = `https://rendifrancisko.com/projects/${params.slug}`;
  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: meta.title,
    name: meta.title,
    description: meta.description,
    url: projectUrl,
    datePublished: meta.date,
    image: meta.thumbnail,
    author: {
      '@type': 'Person',
      name: 'Rendi Dwi Francisko',
      url: 'https://rendifrancisko.com',
    },
    keywords: meta.techStack.split(',').map((item) => item.trim()),
  };

  return (
    <Layout>
      <ReportView slug={params.slug} />
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
        </div>
        <div className='prose dark:prose-invert lg:prose-lg'>{mdxSource}</div>
      </section>
      <JsonLd
        id={`project-${params.slug}-structured-data`}
        data={projectJsonLd}
      />
    </Layout>
  );
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  if (!projects) return [];
  return projects.map((project) => ({
    slug: project.id as string,
  }));
}
