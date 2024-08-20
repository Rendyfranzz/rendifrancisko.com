import * as React from 'react';
import { IoLogoVercel } from 'react-icons/io5';
import {
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGoogleanalytics,
  SiJavascript,
  SiMarkdown,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiPrettier,
  SiPrisma,
  SiReact,
  SiRedux,
  SiSass,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

import Tooltip from './Tippy';

export type TechListType = keyof typeof techList;

export type TechIconsProps = {
  size?: string;
  techs: TechListType[];
} & React.ComponentPropsWithoutRef<'ul'>;

export default function TechIcons({ techs, size }: TechIconsProps) {
  return (
    <ul className='flex gap-2 cursor-pointer'>
      {techs.map((tech) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, array-callback-return
        if (!techList[tech]) return;
        const current = techList[tech];
        return (
          <Tooltip key={current.name} tipChildren={<p>{current.name}</p>}>
            <li
              key={current.name}
              className='text-xl text-gray-700 dark:text-gray-200'
            >
              <current.icon size={size} />
            </li>
          </Tooltip>
        );
      })}
    </ul>
  );
}

const techList = {
  react: {
    icon: SiReact,
    name: 'React',
  },
  nextjs: {
    icon: SiNextdotjs,
    name: 'Next.js',
  },
  tailwindcss: {
    icon: SiTailwindcss,
    name: 'Tailwind CSS',
  },
  scss: {
    icon: SiSass,
    name: 'SCSS',
  },
  javascript: {
    icon: SiJavascript,
    name: 'JavaScript',
  },
  typescript: {
    icon: SiTypescript,
    name: 'TypeScript',
  },
  nodejs: {
    icon: SiNodedotjs,
    name: 'Node.js',
  },
  firebase: {
    icon: SiFirebase,
    name: 'Firebase',
  },
  mongodb: {
    icon: SiMongodb,
    name: 'MongoDB',
  },
  swr: {
    icon: IoLogoVercel,
    name: 'SWR',
  },
  redux: {
    icon: SiRedux,
    name: 'Redux',
  },
  mdx: {
    icon: SiMarkdown,
    name: 'MDX',
  },
  prettier: {
    icon: SiPrettier,
    name: 'Prettier',
  },
  analytics: {
    icon: SiGoogleanalytics,
    name: 'Google Analytics',
  },
  git: {
    icon: SiGit,
    name: 'Git',
  },
  notion: {
    icon: SiNotion,
    name: 'Notion API',
  },
  swift: {
    icon: SiSwift,
    name: 'Swift',
  },
  prisma: {
    icon: SiPrisma,
    name: 'prisma',
  },
  flutter: {
    icon: SiFlutter,
    name: 'flutter',
  },
};
