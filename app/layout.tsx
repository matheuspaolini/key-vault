import { PropsWithChildren } from 'react';

import type { Metadata } from 'next';

import { Inter, Space_Grotesk, Space_Mono, Work_Sans } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--work-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--space-grotesk',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--space-mono',
});

export const metadata: Metadata = {
  title: 'Key Vault',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
