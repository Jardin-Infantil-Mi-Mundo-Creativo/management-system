import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Used when no locale matches
  defaultLocale: 'es',

  // Don't use a locale prefix for the default locale (es)
  localePrefix: 'as-needed',

  // A list of all locales that are supported
  locales: ['en', 'es'],

  // This allows you to have different URLs for each language
  pathnames: {
    '/': '/',
    '/enrollment': {
      en: '/enrollment',
      es: '/matricular-estudiante',
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { getPathname, Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
