import services from '#lib/config/services/loadableConfig';
import servicesWithRadioAndTv from '../config';
import buildRadioAndTvRoutes, {
  buildRadioAndTvDataRoutes,
} from '../buildRadioAndTvRoutes';

const serviceRegex = Object.keys(services).join('|');
const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';
const assetUriRegex = '[a-z-_]{0,}[0-9]{8,}';
const variantRegex = '/simp|/trad|/cyr|/lat';
const articleLocalRegex = 'articles|erthyglau|sgeulachdan';
const errorCodeRegex = '404|500';
const mostRead = 'most_read';

export const articleRegexPath = `/:service(${serviceRegex})/:local(${articleLocalRegex})/:id(${idRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;

export const articleDataRegexPath = `${articleRegexPath}.json`;

export const articleSwRegexPath = `/:service(${serviceRegex})/:local(${articleLocalRegex})/sw.js`;

export const articleManifestRegexPath = `/:service(${serviceRegex})/:local(${articleLocalRegex})/manifest.json`;

export const frontpageRegexPath = `/:service(${serviceRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;

export const frontpageDataRegexPath = `${frontpageRegexPath}.json`;

export const frontpageManifestRegexPath = `/:service(${serviceRegex})/manifest.json`;

export const frontpageSwRegexPath = `/:service(${serviceRegex})/sw.js`;

export const mostReadDataRegexPath = `/:service(${serviceRegex})/${mostRead}:variant(${variantRegex})?.json`;

export const radioAndTvRegexPathsArray = buildRadioAndTvRoutes(
  servicesWithRadioAndTv,
);

export const radioAndTvDataRegexPath = buildRadioAndTvDataRoutes(
  servicesWithRadioAndTv,
);

export const cpsAssetPageRegexPath = `/:service(${serviceRegex})/:assetUri(${assetUriRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;

export const cpsAssetPageDataRegexPath = `${cpsAssetPageRegexPath}.json`;

export const errorPageRegexPath = `/:service(${serviceRegex})/:errorCode(${errorCodeRegex})`;
