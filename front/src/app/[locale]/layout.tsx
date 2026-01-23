import '@/app/globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { AppSidebar } from '@/components/layout/app-sidebar';
import { MainContent } from '@/components/layout/main-content';
import { QueryProvider } from '@/components/providers/query-provider';
import { SidebarProvider } from '@/components/ui/shadcn/sidebar';
import { APP_TITLE } from '@/consts/shared';
import { routing } from '@/i18n/routing';

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <SidebarProvider>
              <AppSidebar />
              <MainContent>{children}</MainContent>
            </SidebarProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
