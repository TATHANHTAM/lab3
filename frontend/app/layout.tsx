import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = { title: 'Lab 3 - Quản lý sản phẩm' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
