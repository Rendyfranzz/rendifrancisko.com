import React from 'react';
import { IconType } from 'react-icons';
import { SiGithub, SiGmail, SiLinkedin } from 'react-icons/si';
import Accent from '../Accent';
import CustomLink from '../buttons/CustomLink';
import Tooltip from '../icons/Tippy';
import { LinkPreview } from '../ui/LinkPreview';

export const Footer = () => {
  return (
    <footer className='mt-4 pb-2 h-full'>
      <div className='layout flex flex-col items-center border-t pt-6 dark:border-gray-600'>
        <p className='h4 mb-2 font-semibold'>Give me a shout</p>
        <div className='flex space-x-4'>
          {socials.map((social) => (
            <Tooltip
              interactive={false}
              key={social.href}
              tipChildren={social.text}
            >
              <CustomLink
                className='inline-flex items-center justify-center rounded-xs focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-300'
                href={social.href}
              >
                <social.icon className='my-auto h-6 w-6 align-middle  transition-colors hover:text-primary-300 dark:hover:text-primary-300 text-foreground' />
              </CustomLink>
            </Tooltip>
          ))}
        </div>
        <div className='text-center'>
          Made using{' '}
          <LinkPreview
            url='https://nextjs.org'
            className='text-primary-500 hover:underline'
          >
            Next.js
          </LinkPreview>
          {', '}
          <LinkPreview
            url='https://www.framer.com/'
            className='text-primary-500 hover:underline'
          >
            Framer Motion
          </LinkPreview>
          {', '}
          and{' '}
          <LinkPreview
            className='text-primary-500 hover:underline'
            url='https://tailwindcss.com'
          >
            Tailwind CSS
          </LinkPreview>
        </div>
        <p className=''>&copy; Rendi Dwi Francisko 2025</p>
        {/* <Spotify className='mt-8' /> */}
      </div>
    </footer>
  );
};

export type Social = {
  href: string;
  icon: IconType;
  id: string;
  text: React.ReactNode;
};
const socials: Social[] = [
  {
    href: 'mailto:rendidwifrans@gmail.com',
    icon: SiGmail,
    id: 'Gmail',
    text: (
      <>
        Email me at{' '}
        <Accent className='font-medium'>
          rendidwifrans
          <wbr />
          @gmail.com
        </Accent>
      </>
    ),
  },
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
