import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KnowYourRights Cards',
  description: 'Your pocket guide to legal rights during police encounters.',
  keywords: ['legal rights', 'police encounters', 'civil rights', 'Base', 'NFT'],
  authors: [{ name: 'KnowYourRights Team' }],
  openGraph: {
    title: 'KnowYourRights Cards',
    description: 'Your pocket guide to legal rights during police encounters.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KnowYourRights Cards',
    description: 'Your pocket guide to legal rights during police encounters.',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
