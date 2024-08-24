import Accent from '@/components/Accent';
import AnimateDiv from '@/components/AnimateDiv';
import Reveal from '@/components/Reveal';
import { ProjectCard } from '@/components/content/project/ProjectCard';
import { Layout } from '@/components/layout/Layout';
import { getAllProjects } from '@/lib/project';
import { ProjectMetadata } from '@/types/project';
import { Redis } from '@upstash/redis';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function index() {
  const mdxSources: ProjectMetadata[] = await getAllProjects();
  const redis = Redis.fromEnv();
  const views = (
    await redis.mget<number[]>(
      ...mdxSources.map((p) => ['pageviews', 'projects', p.id].join(':')),
    )
  ).reduce(
    (acc, v, i) => {
      acc[mdxSources[i].id] = v ?? 0;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <Layout>
      <section className={`layout`}>
        <Reveal>
          <Accent className='text-3xl font-bold '>Projects</Accent>
        </Reveal>
        <Reveal>
          <p>
            Here are some of the projects that I have worked on. I have
            experience in building websites using modern frontend technologies
            and frameworks.
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
            {mdxSources.map((post: ProjectMetadata, idx: number) => (
              <ProjectCard key={idx} project={post} views={views[post.id]} />
            ))}
          </ul>
        </AnimateDiv>
      </section>
    </Layout>
  );
}
