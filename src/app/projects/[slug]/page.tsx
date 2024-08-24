import CustomImages from '@/components/images/CustomImages';
import { Layout } from '@/components/layout/Layout';
import { getAllProjects, getProjectBySlug } from '@/lib/project';
import { ReportView } from '@/lib/views';
import { format, parseISO } from 'date-fns';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  try {
    const project = await getProjectBySlug((params?.slug as string) + '.mdx');
    if (!project) return;
    return {
      title: project.meta.title,
      openGraph: {
        title: project.meta.title,
        description: project.meta.description,
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
