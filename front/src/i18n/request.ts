/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequestConfig } from 'next-intl/server';

import { routing } from '@/i18n/routing';

// Add paths here relative to the 'messages' folder (e.g., 'enrollment/consts')
const namespaces = [
  'shared',
  'shared/secret',
  'enrollment',
  'enrollment/consts',
];

/**
 * Helper to deeply merge messages into a nested object structure
 */
function setNestedMessage(obj: Record<string, any>, path: string, value: any) {
  const keys = path.split('/');
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      current[key] = { ...current[key], ...value };
    } else {
      current[key] = current[key] || {};
      current = current[key];
    }
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  // This should correspond to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  const messages: Record<string, any> = {};

  // 1. Load the base locale file (e.g., messages/es.json) if it exists
  try {
    const baseMessages = (await import(`../../messages/${locale}.json`))
      .default;
    Object.assign(messages, baseMessages);
  } catch (error) {
    console.warn(
      `[i18n] No base messages found for locale: ${locale}. Error: ${error}`
    );
  }

  // 2. Load all defined namespaces from subfolders
  await Promise.all(
    namespaces.map(async (ns) => {
      try {
        const nsMessages = (await import(`../../messages/${ns}/${locale}.json`))
          .default;
        // Nest the messages correctly (e.g., 'enrollment/consts' becomes {enrollment: {consts: ...}})
        setNestedMessage(messages, ns, nsMessages);
      } catch (error) {
        console.error(
          `[i18n] Could not load namespace "${ns}" for locale "${locale}"`,
          error
        );
      }
    })
  );

  return {
    locale,
    messages,
  };
});
