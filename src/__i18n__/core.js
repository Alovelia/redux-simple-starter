import { addLocaleData } from 'react-intl';
import isIntlLocaleSupported from 'intl-locales-supported';

/*
* This object contains async functions
* where keys correspond to user language
* Each function lazy loads scripts related to i18n
* and messages for particular language.
* */
export const localeLoaders = {
  en: async () => {
    if (global.Intl && isIntlLocaleSupported('en')) {
      const [locale, messages] = await Promise.all([
        import('react-intl/locale-data/en' /* webpackChunkName: "intl-locale-en" */),
        import('./en.json' /* webpackChunkName: "locale-en" */)
      ]);
      addLocaleData(locale);
      return messages;
    }
    // polyfill for old browsers
    const [, locale, messages] = await Promise.all([
        import('intl' /* webpackChunkName: "intl-polyfill" */),
        import('react-intl/locale-data/en' /* webpackChunkName: "intl-locale-en" */),
        import('./en.json' /* webpackChunkName: "locale-en" */)
    ]);
    await import('intl/locale-data/jsonp/en-GB' /* webpackChunkName: "intl-polyfill" */);
    addLocaleData(locale);
    return messages;
  },
  // to add another language - uncomment the next block
//   de: async () => {
//     if (global.Intl && isIntlLocaleSupported('de')) {
//       const [locale, messages] = await Promise.all([
//         import('react-intl/locale-data/de' /* webpackChunkName: "intl-locale-de" */),
//         import('./de.json' /* webpackChunkName: "locale-de" */),
//         import('moment/locale/de' /* webpackChunkName: "intl-locale-de" */)
//       ]);
//       addLocaleData(locale);
//       return messages;
//     }
//     // polyfill for old browsers
//     const [, locale, messages] = await Promise.all([
//         import('intl' /* webpackChunkName: "intl-polyfill" */),
//         import('react-intl/locale-data/de' /* webpackChunkName: "intl-locale-en" */),
//         import('./de.json' /* webpackChunkName: "locale-de" */),
//         import('moment/locale/de' /* webpackChunkName: "intl-locale-en" */)
//     ]);
//     await import('intl/locale-data/jsonp/de' /* webpackChunkName: "intl-polyfill" */);
//     addLocaleData(locale);
//     return messages;
//   },
};

/*
* It loads all locale data dependencies and messages
* for chosen locale using lazy load
* @returns {Promise} - resolved with messages
* */
export function loadLocaleData(locale) {
  return localeLoaders[locale]();
}

/*
* @param {string} locale - Current locale e.g 'EN'
* @returns {Bool}
* */
export function isLocaleSupported(locale) {
  return !!localeLoaders[locale];
}

/*
* Define user's language. Different browsers have the user locale defined
* on different fields on the `navigator` object, so we make sure to account
* for these different by checking all of them
* @returns {string} 'en-US'
* */
export function getDefaultLanguage() {
  let navigator = global.navigator;
  return (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage;
}

/*
* @param {string} language - Current language e.g 'en-US'
* @returns {string} 'en' - trimmed navigator language
* */
export function getLangWithoutRegionCode(language) {
  return language.toLowerCase().split(/[_-]+/)[0];
}

/*
* @returns {string} userLang or default - language supported by the app
* */
export function getDefaultSupportedLanguage() {
  const DEFAULT_LANG = 'en';
  const userLang = getLangWithoutRegionCode(getDefaultLanguage());

  if (isLocaleSupported(userLang)) {
    return userLang;
  }

  return DEFAULT_LANG;
}
