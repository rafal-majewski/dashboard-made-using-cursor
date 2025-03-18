import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PrelineScript from '@/components/PrelineScript';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'A simple dashboard built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <PrelineScript />
      </body>
    </html>
  );
} 