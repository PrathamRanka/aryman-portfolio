import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Setup fonts with CSS variables
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400']
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '700']
});

export const metadata: Metadata = {
  title: 'Aryaman Malik - Portfolio',
  description: 'Cybersecurity Analyst & Creative Technologist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Apply font variables and base classes to the body */}
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans text-gray-300 bg-brand-dark`}>
        {children}
      </body>
    </html>
  );
}