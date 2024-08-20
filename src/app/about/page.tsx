import Accent from '@/components/Accent';
import { Layout } from '@/components/layout/Layout';

export default function index() {
  return (
    <Layout>
      <section className='layout'>
        <div className='prose  dark:prose-invert'>
          <h1 className='mt-4'>
            <Accent>About me</Accent>
          </h1>
          <p>
            My name is<Accent> Rendi Dwi Francisko.</Accent>
          </p>
          <p>
            I am currently pursuing a degree in Informatics at Institut
            Teknologi Sepuluh Nopember. My journey in programming began with
            exploring various technologies and quickly led me to work on several
            projects as a Frontend Developer. Over time, I have concentrated on
            web development with JavaScript technologies, particularly using
            React and Next.js.
          </p>
          <p>
            On this page, I will showcase some of the projects I have been
            involved in. If you'd like to discuss anything or share your
            thoughts, feedback, or suggestions, please don’t hesitate to get in
            touch. I look forward to hearing from you!
          </p>
        </div>
      </section>
    </Layout>
  );
}
