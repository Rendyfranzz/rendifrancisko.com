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
      className='rounded-xl md:w-full
        group
        bg-card border border-border/50
        hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10
        scale-100 hover:scale-[1.02] active:scale-[0.98] motion-safe:transform-gpu
        transition-all duration-300 ease-out
        motion-reduce:hover:scale-100'
    >
      <article>
        <CustomLink
          href={`/projects/${project.id}`}
          className='flex h-full flex-col p-5'
        >
          <div className='flex justify-between items-start w-full mb-3'>
            <h3 className='font-semibold text-lg group-hover:text-primary-500 transition-colors duration-200'>
              {project.title}
            </h3>
            <span className='flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full'>
              <LuEye className='w-3.5 h-3.5' />
              {Intl.NumberFormat('en-US', { notation: 'compact' }).format(
                views,
              )}
            </span>
          </div>

          <p className='mb-auto text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors duration-200'>
            {project.description}
          </p>

          <div className='mt-4 mb-3'>
            <TechIcons techs={project.techStack.split(',') as TechListType[]} />
          </div>

          <div className='h-36 overflow-hidden rounded-lg mb-3'>
            {project.thumbnail != null && (
              <CustomImages
                priority
                useSkeleton
                src={project.thumbnail}
                alt={project.title}
                width={1000}
                height={792}
                className='rounded-lg w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out'
              />
            )}
          </div>

          <div className='flex items-center justify-between'>
            <time
              dateTime={project.date}
              className='text-xs text-muted-foreground'
            >
              {format(parseISO(project.date), 'MMM d, yyyy')}
            </time>

            <span className='text-sm font-medium text-primary-500 group-hover:translate-x-1 transition-transform duration-200'>
              See more →
            </span>
          </div>
        </CustomLink>
      </article>
    </li>
  );
};
