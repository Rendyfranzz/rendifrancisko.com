import Accent from '@/components/Accent';
import { Layout } from '@/components/layout/Layout';

export default function index() {
  return (
    <Layout>
      <section className='layout'>
        <div className='prose  dark:prose-invert'>
          <Accent className='text-3xl font-bold '>About me</Accent>
          <p>
            My name is
            <Accent className='font-medium'> Rendi Dwi Francisko.</Accent>
          </p>
          <p>
            I hold a degree in Informatics from Institut Teknologi Sepuluh
            Nopember. My programming journey began with exploring various
            technologies, which quickly led me to work on several projects as a
            Frontend Developer. Over time, I have focused on web development,
            specializing in JavaScript technologies, particularly React and
            Next.js.
          </p>
          <p>
            On this page, I showcase some of the projects I have been involved
            in, reflecting my growth and experiences in the field. If you’d like
            to discuss anything or share your thoughts, feedback, or
            suggestions, please feel free to get in touch. I am always open to
            new conversations and collaborations. I look forward to hearing from
            you!
          </p>
        </div>
      </section>
    </Layout>
  );
}
