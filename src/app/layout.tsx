import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import ProgressBarProvider from '@/components/ProgressBarProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://rendifrancisko.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Rendi Francisko',
    template: `%s | rendifrancisko.com`,
  },
  description:
    'Explore the online portfolio and blog of Rendi Dwi Francisko. Highlighting my projects and offering insights into web development practices.',
  openGraph: {
    title: 'Rendi Francisko',
    type: 'website',
    siteName: 'Rendi Francisko',
    description:
      'Explore the online portfolio and blog of Rendi Dwi Francisko. Highlighting my projects and offering insights into web development practices.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1208,
        height: 1208,
        alt: 'Rendi Francisko',
      },
    ],
  },
  twitter: {
    title: 'Rendi Francisko',
    site: '@RendiFrancisko',
    card: 'summary_large_image',
    images: {
      url: '/images/og-image.png',
      width: 1208,
      height: 1208,
      alt: 'Rendi Francisko',
    },
    description:
      'Explore the online portfolio and blog of Rendi Dwi Francisko. Highlighting my projects and offering insights into web development practices.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='!scroll-smooth' suppressHydrationWarning>
      <body
        className={cn(
          'bg-white transition-colors dark:bg-black dark:text-gray-300',
          inter.className,
        )}
      >
        <ProgressBarProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
