import Link from 'next/link';
import React from 'react';
interface Myprops {
  children: React.ReactNode;
  href: string;
}
const Links: React.FC<Myprops> = ({ children, href, ...rest }) => {
  return (
    <Link href={href} scroll={false} passHref legacyBehavior>
      <a href={href} {...rest} className='text-center p hover:text-primary-500'>
        {children}
      </a>
    </Link>
  );
};

export default Links;
