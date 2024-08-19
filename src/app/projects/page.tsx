import AnimateDiv from '@/components/AnimateDiv';
import Reveal from '@/components/Reveal';
import { ProjectCard } from '@/components/content/project/ProjectCard';
import { Layout } from '@/components/layout/Layout';
import { getAllProjects } from '@/lib/project';
import { ProjectMetadata } from '@/types/project';

export default async function index() {
  const mdxSources: ProjectMetadata[] = await getAllProjects();
  return (
    <Layout>
      <section className={`layout`}>
        <Reveal>
          <h1 className=' text-3xl font-bold'>Projects</h1>
        </Reveal>
        <Reveal>
          <p className='mt-4 text-xl font-semibold'>
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
              <ProjectCard key={idx} {...post} />
            ))}
          </ul>
        </AnimateDiv>
      </section>
    </Layout>
  );
}

// async function getProjects() {
//   const mdxSources = await getAllProjects();

//   return {
//     mdxSources,
//   };
// }
