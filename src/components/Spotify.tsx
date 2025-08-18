'use client';
import { type SpotifyData } from '@/types/spotify';
import clsx from 'clsx';
import {} from 'react';
import { SiSpotify } from 'react-icons/si';
import useSWR from 'swr';
import CustomLink, { CustomLinkProps } from './buttons/CustomLink';
import Tooltip from './icons/Tippy';
import CustomImages from './images/CustomImages';

export default function Spotify({
  className,
  ...rest
}: Omit<CustomLinkProps, 'href' | 'children'>) {
  const fetcher = async (url: string) =>
    await fetch(url).then(async (res) => await res.json());
  const { data } = useSWR<SpotifyData>('/spotify', fetcher);

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  return data?.isPlaying ? (
    <figure className={className} data-cy='spotify'>
      <Tooltip
        trigger='mouseenter'
        interactive
        html={
          <div className='inline-block rounded-md border bg-white p-2 text-gray-600 shadow-md dark:border-gray-600 dark:bg-dark dark:text-gray-200'>
            <p>Currently playing on my Spotify</p>
          </div>
        }
      >
        <CustomLink
          {...rest}
          href={data.songUrl}
          className={clsx(
            'relative flex items-center gap-4 p-3',
            'border dark:border-gray-600',
            'border-thin w-72 rounded-md',
            'shadow-xs dark:shadow-none',
            'focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-300',
          )}
        >
          <CustomImages
            useSkeleton
            className='w-16 shadow-xs dark:shadow-none'
            src={data.albumImageUrl}
            alt={data.album}
            width={640}
            height={640}
          />
          <div className='flex-1'>
            <p className='text-sm font-medium'>{data.title}</p>
            <p className='mt-1 text-xs text-gray-600 dark:text-gray-300'>
              {data.artist}
            </p>
          </div>
          <div className='absolute right-1.5 bottom-1.5'>
            <SiSpotify size={20} color='#1ED760' />
          </div>
        </CustomLink>
      </Tooltip>
    </figure>
  ) : null;
}
