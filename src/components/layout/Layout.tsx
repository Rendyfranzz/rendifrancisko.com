import React from 'react';

import { Footer } from './Footer';
import Header from './Header';

interface Page {
  children: React.ReactNode;
}
export const Layout = ({ children }: Page) => {
  return (
    <>
      <Header />
      <main id='main-content' role='main' className='flex-1'>
        {children}
      </main>
      <Footer />
    </>
  );
};
