import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/components/ui/shadcn/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { MainContent } from '@/components/layout/main-content';
import { QueryProvider } from '@/components/providers/query-provider';
import { APP_TITLE } from '@/consts/shared';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_TITLE,
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
