'use client';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import CustomLink from '../buttons/CustomLink';
import { ThemeButton } from '../buttons/ThemeButton';

export default function Header() {
  const pathName = usePathname();

  return (
    <header className='sticky top-0 shadow-xs z-50 transition-colors bg-white dark:bg-black'>
      <nav className='flex items-center layout justify-center '>
        <div className='w-full flex justify-between'>
          <ul className='flex flex-row justify-center items-center space-x-6 font-bold'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <CustomLink href={href}>
                  <p
                    className={cn(
                      '',
                      pathName === href ? 'text-primary-500' : '',
                      'hover:text-primary-500',
                    )}
                  >
                    {label}
                  </p>
                </CustomLink>
              </li>
            ))}
          </ul>
          <ThemeButton className='p-2 cursor-pointer' />
        </div>
      </nav>
    </header>
  );
}
const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];
