import Accent from '@/components/Accent';
import { Layout } from '@/components/layout/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default function index() {
  return (
    <Layout>
      <section className='layout'>
        <div className='prose dark:prose-invert'>
          <Accent className='text-3xl font-bold text-black'>About me</Accent>
          <p>
            My name is
            <Accent className='font-medium text-black'>
              {' '}
              Rendi Dwi Francisko.
            </Accent>
          </p>
          <p>
            I am a graduate of Informatics Engineering from Sepuluh Nopember
            Institute of Technology. My journey started with exploring various
            technologies, which quickly led me to work on several projects. Over
            time, I focused on web development specializing in Frontend and
            Backend. On the Frontend I use JavaScript, especially React and
            Next.js, while on the Backend I use Go, Express JS, and Restify JS.
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
