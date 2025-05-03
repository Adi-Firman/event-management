// src/app/layout.tsx
import { ReactNode } from 'react';
import './globals.css'; // pastikan file global CSS sudah dibuat
import Providers from '@/components/Providers'; // konteks global seperti next-auth, theme, dsb.

export const metadata = {
  title: 'Event Management',
  description: 'Platform pengelolaan event dengan fitur lengkap',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Kamu bisa menambahkan font, favicon, atau meta lainnya di sini */}
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
