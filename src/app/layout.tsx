import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/store/ReduxProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Sahan Tharaka Dias - Portfolio',
  description:
    '3D Interactive Portfolio of Sahan Tharaka Dias - IT Undergraduate & Full-Stack Developer specializing in MERN stack, AI/ML',
  keywords: [
    'Sahan Tharaka Dias',
    'Portfolio',
    'Full-Stack Developer',
    'MERN Stack',
    'React',
    'Next.js',
    'Sri Lanka',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
