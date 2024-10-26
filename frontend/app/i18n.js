import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import af from './locales/af.json';
import ns from './locales/ns.json';
import ts from './locales/ts.json';
import ve from './locales/ve.json';
import zn from './locales/zn.json';



i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      af: { translation: af },
      ns: { translation: ns },
      ts: { translation: ts },
      ve: { translation: ve },
      zn: { translation: zn },
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: true, 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
