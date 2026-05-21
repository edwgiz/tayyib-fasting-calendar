let i18nBundle;

export async function i18n(path) {
  if (!i18nBundle) {
    const bcp47 = (navigator.languages && navigator.languages[0]) || navigator.language || 'en-US';
    let iso639_1 = bcp47.substring(0, 2);
    if (!['en', 'ar', 'bn', 'tr', 'uz', 'ur', 'pa', 'in', 'ms', 'jv', 'fa', 'ha'].includes(iso639_1)) {
      iso639_1 = 'en';
    }
    i18nBundle = await (await fetch(`i18n/${iso639_1}.json`)).json();
  }
  if (path) {
    const value = path.split('.').reduce((obj, key) => obj?.[key], i18nBundle);
    return value ? value : path;
  } else {
    return i18nBundle;
  }
}
