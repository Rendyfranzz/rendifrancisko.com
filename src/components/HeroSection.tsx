'use client';

import { motion } from 'framer-motion';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import Accent from './Accent';
import BG from './BG';
import CustomLink from './buttons/CustomLink';
import { Social } from './layout/Footer';
import { ShootingStars } from './ui/ShootingStars';
import { StarsBackground } from './ui/StarsBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function HeroSection() {
  return (
    <section className='min-h-main relative flex items-center justify-center overflow-hidden'>
      <motion.div
        className='layout relative z-40 w-full py-20 md:py-0'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <div className='flex flex-col items-center text-center max-w-4xl mx-auto'>
          <motion.div variants={itemVariants}>
            <span className='inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-6 border border-primary-500/20'>
              Hello, I am
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6'
          >
            <span className='relative'>
              <span className='relative z-10'>
                <Accent className=''>Rendi</Accent>
              </span>
              <motion.span
                className='absolute -bottom-2 left-0 right-0 h-3 bg-primary-500/20 -z-0 rounded-full'
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
              />
            </span>{' '}
            Dwi Francisko
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className='text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed'
          >
            Informatics Engineering Student of{' '}
            <span className='font-medium text-foreground'>
              Institute Teknologi Sepuluh Nopember
            </span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='flex flex-wrap gap-4 justify-center'
          >
            {socials.map((social, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CustomLink
                  href={social.href}
                  aria-label={social.id}
                  className='inline-flex items-center gap-3 px-6 py-3 rounded-full border bg-background/80 backdrop-blur-sm hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 ease-out shadow-sm hover:shadow-lg hover:shadow-primary-500/25'
                >
                  <social.icon className='w-5 h-5' />
                  <span className='font-medium'>{social.id}</span>
                </CustomLink>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className='hidden md:block absolute right-[-10%] top-1/2 -translate-y-1/2 z-20 w-[500px] lg:w-[700px] xl:w-[800px] pointer-events-none'
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.7, x: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
        >
          <BG className='w-full h-auto opacity-70 dark:opacity-50' />
        </motion.div>
      </motion.div>

      <motion.div
        className='absolute bottom-8 left-1/2 -translate-x-1/2 z-40'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          className='w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center p-1'
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div className='w-1.5 h-1.5 rounded-full bg-muted-foreground/50' />
        </motion.div>
      </motion.div>

      <ShootingStars />
      <StarsBackground />
    </section>
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
