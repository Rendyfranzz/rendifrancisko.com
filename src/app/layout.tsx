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
  title: {
    default: 'Rendi Francisko',
    template: `%s | rendifrancisko.com`,
  },
  icons: {
    apple: [
      { url: '/icons/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/icons/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/icons/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      {
        url: '/icons/apple-icon-114x114.png',
        sizes: '114x114',
        type: 'image/png',
      },
      {
        url: '/icons/apple-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        url: '/icons/apple-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        url: '/icons/apple-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        url: '/icons/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    icon: [
      {
        url: '/icons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
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
  manifest: '/icons/manifest.json',
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
