import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/components/ui/shadcn/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { MainContent } from '@/components/layout/main-content';
import { QueryProvider } from '@/components/providers/query-provider';
import { APP_TITLE } from '@/consts/shared';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  description: APP_TITLE,
  title: APP_TITLE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <SidebarProvider>
            <AppSidebar />
            <MainContent>{children}</MainContent>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
