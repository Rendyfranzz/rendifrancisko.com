import { Layout } from '@/components/layout/Layout';
import { getAllProjects, getProjectBySlug } from '@/lib/project';
import { ProjectMetadata } from '@/types/project';
import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Index({
  meta,
  mdxSource,
}: {
  meta: ProjectMetadata;
  mdxSource: MDXRemoteSerializeResult;
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <section className='layout'>
        {meta.thumbnail != null && (
          <Image
            src={meta.thumbnail}
            alt={meta.title}
            height={300}
            width={1200}
            className='rounded-lg'
          />
        )}
        <div className='mb-6 text-center'>
          <h1 className='mb-1 text-3xl font-bold'>{meta.title}</h1>
          <time dateTime={meta.date} className='text-sm text-slate-600'>
            {format(parseISO(meta.date), 'LLLL d, yyyy')}
          </time>
        </div>
        <div className='space-y-3'>
          <MDXRemote {...mdxSource} />
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const projects = await getAllProjects();

  const paths = projects.map((project) => ({
    params: { slug: project.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = await getProjectBySlug((params?.slug as string) + '.mdx');

  return {
    props: {
      meta: project.meta,
      mdxSource: project.mdxSource,
    },
  };
};
