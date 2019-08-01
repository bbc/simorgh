import services from '../../lib/config/services/loadableConfig';
import servicesWithRadioOrTv from '../config';
import buildMediaRoutes, { buildMediaDataRoutes } from '../buildMediaRoutes';

const serviceRegex = Object.keys(services).join('|');
const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';

export const articleRegexPath = `/:service(${serviceRegex})/articles/:id(${idRegex}):amp(${ampRegex})?`;

export const articleDataRegexPath = `${articleRegexPath}.json`;

export const articleSwRegexPath = `/:service(${serviceRegex})/articles/sw.js`;

export const articleManifestRegexPath = `/:service(${serviceRegex})/articles/manifest.json`;

export const frontpageRegexPath = `/:service(${serviceRegex}):amp(${ampRegex})?`;

export const frontpageDataRegexPath = `${frontpageRegexPath}.json`;

export const frontpageManifestRegexPath = `/:service(${serviceRegex})/manifest.json`;

export const frontpageSwRegexPath = `/:service(${serviceRegex})/sw.js`;

export const mediaRadioAndTvRegexPathsArray = buildMediaRoutes(
  servicesWithRadioOrTv,
);

export const mediaDataRegexPath = buildMediaDataRoutes(servicesWithRadioOrTv);
