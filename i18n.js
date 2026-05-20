let i18nCache;
let i18nLocale = 'en';

export async function i18n(path) {
  if (!i18nCache) {
    i18nCache = await (await fetch(`i18n/${i18nLocale}.json`)).json();
  }
  const value = path.split('.').reduce((obj, key) => obj?.[key], i18nCache);
  return value ? value : path;
}

export async function setI18nLocale(locale) {
  let simpleLocale = locale.substring(0, 2);
  if (['en'].includes(simpleLocale)) {
    i18nLocale = simpleLocale;
  } else {
    i18nLocale = 'en';
  }
}
