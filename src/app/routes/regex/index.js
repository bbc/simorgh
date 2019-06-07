import services from '../../lib/config/services/async';

const serviceRegex = Object.keys(services)
  .join('|');
const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';

export const articleRegexPath = `/:service(${serviceRegex})/articles/:id(${idRegex}):amp(${ampRegex})?`;

export const articleDataRegexPath = `${articleRegexPath}.json`;

export const frontpageRegexPath = `/:service(${serviceRegex}):amp(${ampRegex})?`;

export const frontpageDataRegexPath = `${frontpageRegexPath}.json`;

export const swRegexPath = `/:service(${serviceRegex})/articles/sw.js`;

export const manifestRegexPath = `/:service(${serviceRegex})/articles/manifest.json`;
