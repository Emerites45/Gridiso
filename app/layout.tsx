/* eslint-disable @next/next/no-page-custom-font */
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GridOS | SOCADEL Dashboard',
  description: 'SOCADEL Operational Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Ajoute le lien pour les icônes Material ici */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-background text-on-surface">
        {children}
      </body>
    </html>
  );
}
