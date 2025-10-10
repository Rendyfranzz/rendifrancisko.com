import Accent from '@/components/Accent';
import { Layout } from '@/components/layout/Layout';
import { JsonLd } from '@/components/seo/JsonLd';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Rendi Dwi Francisko, a software engineer focused on modern web development using Next.js, TypeScript, and Go.',
  keywords: [
    'About Rendi Francisko',
    'Software engineer profile',
    'Full stack developer Indonesia',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | Rendi Francisko',
    type: 'profile',
    url: '/about',
    description:
      'Background, skills, and experience of Rendi Dwi Francisko, a software engineer based in Indonesia.',
  },
  twitter: {
    title: 'About | Rendi Francisko',
    description:
      'Background, skills, and experience of Rendi Dwi Francisko, a software engineer based in Indonesia.',
  },
};

export default function index() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Rendi Dwi Francisko',
    description:
      'Background, skills, and experience of software engineer Rendi Dwi Francisko.',
    mainEntity: {
      '@type': 'Person',
      name: 'Rendi Dwi Francisko',
      url: 'https://rendifrancisko.com',
    },
  };

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
      <JsonLd id='about-structured-data' data={aboutJsonLd} />
    </Layout>
  );
}
