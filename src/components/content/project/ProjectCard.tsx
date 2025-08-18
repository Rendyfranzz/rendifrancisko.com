'use client';
import CustomLink from '@/components/buttons/CustomLink';
import TechIcons, { type TechListType } from '@/components/icons/TechIcon';
import CustomImages from '@/components/images/CustomImages';
import { ProjectMetadata } from '@/types/project';
import { format, parseISO } from 'date-fns';
import { LuEye } from 'react-icons/lu';

interface ProjectCardProps {
  project: ProjectMetadata;
  views: number;
}

export const ProjectCard = ({ project, views }: ProjectCardProps) => {
  return (
    <li
      className='rounded-md md:w-full
        group
        border  hover:border-primary-500
        scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu
        transition duration-100
        motion-reduce:hover:scale-100'
    >
      <CustomLink
        href={`/projects/${project.id}`}
        className='flex h-full flex-col items-start rounded-md p-4'
      >
        <div className='flex justify-between w-full'>
          <h4>{project.title}</h4>
          <span className='flex items-center gap-1 text-xs text-zinc-500'>
            <LuEye className='w-4 h-4' />
            {Intl.NumberFormat('en-US', { notation: 'compact' }).format(views)}
          </span>
        </div>

        <p className='mb-auto text-sm text-gray-700 dark:text-gray-300'>
          {project.description}
        </p>
        <div className='mt-2 mb-1'>
          <TechIcons techs={project.techStack.split(',') as TechListType[]} />
        </div>
        <div className='h-40 overflow-hidden'>
          {project.thumbnail != null && (
            <CustomImages
              priority
              useSkeleton
              src={project.thumbnail}
              alt={project.title}
              width={1000}
              height={792}
              className='rounded-lg w-full'
            />
          )}
        </div>

        <time dateTime={project.date} className='block text-sm text-slate-600'>
          {format(parseISO(project.date), 'LLLL d, yyyy')}
        </time>

        <span
          className='font-medium flex flex-col after:h-[0.15rem] after:max-w-0 group-hover:after:max-w-full 
          after:bg-primary-500 after:transition-all after:duration-500 after:ease-in-out after:rounded-r-md'
        >
          See more →
        </span>
      </CustomLink>
    </li>
  );
};
