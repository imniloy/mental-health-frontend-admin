// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { AdminLayout } from '@/components/AdminLayout'; // Ensure this path is correct

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SereneMind Admin Panel',
  description: 'Admin dashboard for the SereneMind application',
};

// This is a server component that wraps all pages in the AdminLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>
        <AdminLayout>
          {children}
        </AdminLayout>
      </body>
    </html>
  );
}
