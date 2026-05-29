import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Foyer — Your ticket. Secured.',
  description: 'Foyer is a premium event ticketing and resale marketplace built around absolute security, platform custody, and verified delivery.',
  keywords: 'Foyer, event tickets, ticket resale, secondary ticket market, secure ticketing, premium event tickets',
  authors: [{ name: 'Foyer Inc.' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-background text-textPrimary antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
