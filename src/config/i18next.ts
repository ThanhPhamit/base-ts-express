import { ConfigApp } from '@/config/constant';

export const i18nextOptions = {
  backend: {
    loadPath: __dirname + '/../../locales/{{lng}}.json',
  },
  lng: ConfigApp.LOCALE, // Default language
  fallbackLng: ConfigApp.LOCALE, // Fallback language if translations are missing
  preload: ['en', 'jp'], // Languages to preload
};
