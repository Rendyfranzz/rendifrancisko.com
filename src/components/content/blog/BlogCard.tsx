'use client';
import CustomLink from '@/components/buttons/CustomLink';
import CustomImages from '@/components/images/CustomImages';
import { BlogMetadata } from '@/types/blog';
import { format, parseISO } from 'date-fns';

interface BlogCardProps {
  blog: BlogMetadata;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
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
        href={`/blog/${blog.id}`}
        className='flex h-full flex-col items-start rounded-md p-4'
      >
        <div className='flex justify-between w-full'>
          <h4>{blog.title}</h4>
        </div>

        <p className='mb-auto text-sm text-foreground'>{blog.description}</p>
        <div className='mt-2 mb-1 flex flex-wrap gap-1'>
          {blog.tags.split(',').map((tag) => (
            <span
              key={tag}
              className='text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full'
            >
              {tag.trim()}
            </span>
          ))}
        </div>
        <div className='h-40 overflow-hidden'>
          {blog.thumbnail != null && (
            <CustomImages
              priority
              useSkeleton
              src={blog.thumbnail}
              alt={blog.title}
              width={1000}
              height={792}
              className='rounded-lg w-full'
            />
          )}
        </div>

        <time dateTime={blog.date} className='block text-sm text-slate-600'>
          {format(parseISO(blog.date), 'LLLL d, yyyy')}
        </time>

        <span
          className='font-medium flex flex-col after:h-[0.15rem] after:max-w-0 group-hover:after:max-w-full 
          after:bg-primary-500 after:transition-all after:duration-500 after:ease-in-out after:rounded-r-md'
        >
          Read more →
        </span>
      </CustomLink>
    </li>
  );
};
