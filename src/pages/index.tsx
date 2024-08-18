import BG from '@/components/BG';
import Reveal from '@/components/Reveal';
import { Layout } from '@/components/layout/Layout';
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function Home() {
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
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, 
  ${theme === 'dark' ? '#000' : '#fff'}
   50%, ${color})`;

  useEffect(() => {
    animate(color, COLORS, {
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    });
  }, []);
  return (
    <Layout>
      <motion.section
        style={{
          backgroundImage,
        }}
        className='min-h-main'
      >
        <div className='h-screen flex flex-row items-center justify-between layout relative overflow-hidden'>
          <div className='h-[70%]'>
            <div className='flex flex-col'>
              <Reveal>
                <p className='h1 text-3xl md:text-5xl 2xl:text-6xl'>
                  HELLO ,I AM
                </p>
              </Reveal>
              <Reveal>
                <p className='h1 text-3xl md:text-5xl 2xl:text-6xl mt-2'>
                  <span
                    className='transition-colors
            bg-gradient-to-tr from-primary-300/40 via-primary-300/40 to-primary-400/40
           dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent h1 text-3xl md:text-5xl 2xl:text-6xl'
                  >
                    RENDI{' '}
                  </span>
                  DWI FRANCISKO
                </p>
              </Reveal>
              <Reveal>
                <div className='w-full mt-20 md:mt-12'>
                  <p className='h1'>
                    Informatics Engineering Student of<br></br> Institute
                    Teknologi Sepuluh Nopember
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
          <div className='w-[30%] h-[80%] border hidden md:block'></div>
          <BG className='z-20 absolute bottom-60 right-6 h-full translate-y-[37%] transform-gpu w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px] opacity-70 dark:opacity-70' />
        </div>
      </motion.section>
    </Layout>
  );
}
