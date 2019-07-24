import services from '../../lib/config/services/loadableConfig';

const serviceRegex = Object.keys(services).join('|');
const idRegex = 'c[a-zA-Z0-9]{10}o';
const serviceIdRegex = [
  'bbc_amharic_radio',
  'bbc_oromo_radio',
  'bbc_indonesian_radio',
  'bbc_korean_radio',
  'bbc_tigrinya_radio',
].join('|');
const mediaIdRegex = 'liveradio';
const ampRegex = '.amp';

export const articleRegexPath = `/:service(${serviceRegex})/articles/:id(${idRegex}):amp(${ampRegex})?`;

export const articleDataRegexPath = `${articleRegexPath}.json`;

export const articleSwRegexPath = `/:service(${serviceRegex})/articles/sw.js`;

export const articleManifestRegexPath = `/:service(${serviceRegex})/articles/manifest.json`;

export const frontpageRegexPath = `/:service(${serviceRegex}):amp(${ampRegex})?`;

export const frontpageDataRegexPath = `${frontpageRegexPath}.json`;

export const frontpageManifestRegexPath = `/:service(${serviceRegex})/manifest.json`;

export const frontpageSwRegexPath = `/:service(${serviceRegex})/sw.js`;

export const mediaRegexPath = `/:service(${serviceRegex})/:serviceId(${serviceIdRegex})/:mediaId(${mediaIdRegex}):amp(${ampRegex})?`;
