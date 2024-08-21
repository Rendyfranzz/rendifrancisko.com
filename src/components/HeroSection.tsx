'use client';
import { animate, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import Accent from './Accent';
import AnimateSection from './AnimateSection';
import BG from './BG';
import Reveal from './Reveal';
import CustomLink from './buttons/CustomLink';
import { Social } from './layout/Footer';

export default function HeroSection() {
  const COLORS = [
    '#13FFAA', // Turquoise
    '#1E67C6', // Deep Blue
    '#FF6F6F', // Soft Coral
    '#F5F5F5', // Light Gray
    '#2E3A8C', // Dark Slate
    '#B9FF00', // Lime Green
  ];
  const { theme } = useTheme();
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 100%, ${theme === 'dark' ? '#000' : '#fff'} 40%, ${color})`;

  useEffect(() => {
    animate(color, COLORS, {
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    });
  }, []);
  return (
    <AnimateSection
      style={{
        backgroundImage,
      }}
      className='min-h-main'
    >
      <div className='h-screen flex flex-row items-center justify-between layout relative overflow-hidden'>
        <div className='h-[70%] space-y-4'>
          <div className='flex flex-col'>
            <Reveal>
              <p className='h1 '>HELLO ,I AM</p>
            </Reveal>
            <Reveal>
              <p className='h1  mt-2'>
                <Accent className='h1 '>RENDI </Accent>
                DWI FRANCISKO
              </p>
            </Reveal>
            <Reveal>
              <div className='w-full mt-8 md:mt-12'>
                <p className='h1'>
                  Informatics Engineering Student of<br></br> Institute
                  Teknologi Sepuluh Nopember
                </p>
              </div>
            </Reveal>
          </div>
          <div className='flex space-x-4'>
            {socials.map((social) => (
              <Reveal>
                <CustomLink
                  key={social.href}
                  className='inline-flex items-center justify-center rounded-md shadow-sm border p-1 hover:bg-primary-300 transition-colors
                   dark:hover:text-black dark:hover:bg-primary-300 hover:scale-105  duration-100 ease-in-out'
                  href={social.href}
                >
                  <social.icon className='my-auto h-6 w-6 align-middle ' />
                  <p>
                    <span className='font-bold'>{social.id}</span>
                  </p>
                </CustomLink>
              </Reveal>
            ))}
          </div>
        </div>
        <div className='w-[30%] h-[80%] border hidden md:block'></div>
        <BG className='z-20 absolute bottom-60 right-6 h-full translate-y-[37%] transform-gpu w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px] opacity-70 dark:opacity-70' />
      </div>
    </AnimateSection>
  );
}

const socials: Social[] = [
  {
    href: 'https://github.com/Rendyfranzz',
    icon: SiGithub,
    id: 'Github',
    text: (
      <>
        See my projects on <Accent className='font-medium'>Github</Accent>
      </>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/rendi-dwi-francisko/',
    icon: SiLinkedin,
    id: 'Linkedin',
    text: (
      <>
        Find me on <Accent className='font-medium'>Linkedin</Accent>
      </>
    ),
  },
];