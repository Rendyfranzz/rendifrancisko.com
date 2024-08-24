import AnimateDiv from '@/components/AnimateDiv';
import AnimateSection from '@/components/AnimateSection';
import HeroSection from '@/components/HeroSection';
import Reveal from '@/components/Reveal';
import CustomLink from '@/components/buttons/CustomLink';
import { ProjectCard } from '@/components/content/project/ProjectCard';
import { Layout } from '@/components/layout/Layout';
import { getAllProjects } from '@/lib/project';
import { ProjectMetadata } from '@/types/project';
import { Redis } from '@upstash/redis';

export default async function Home() {
  const mdxSources: ProjectMetadata[] = await getAllProjects({ count: 3 });
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
      <HeroSection />
      <AnimateSection>
        <div className='layout min-h-main'>
          <Reveal>
            <h1>Recently Project</h1>
          </Reveal>
          <AnimateDiv
            className='space-y-4 flex flex-col'
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
                <ProjectCard
                  key={idx}
                  project={post}
                  views={views[post.id] ?? 0}
                />
              ))}
            </ul>
            <CustomLink
              href='/projects'
              className='p font-semibold border p-1 rounded-md w-fit hover:border-primary-500 hover:scale-105 transition-all duration-100 ease-in-out'
            >
              View All Projects
            </CustomLink>
          </AnimateDiv>
        </div>
      </AnimateSection>
    </Layout>
  );
}
