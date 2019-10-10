import services from '#lib/config/services/loadableConfig';
import servicesWithRadioAndTv from '../config/servicesWithRadioOrTv';
import buildRadioAndTvRoutes, {
  buildRadioAndTvDataRoutes,
} from '../buildRadioAndTvRoutes';

const serviceRegex = Object.keys(services).join('|');
const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';
const assetUriRegex = '[a-z-_]{0,}[0-9]{8,}';

const variantRegex = '/simp|/trad|/cyr|/lat';

const articleLocalMapping = {
  cymrufyw: 'erthyglau',
  naidheachdan: 'sgeulachdan',
};

const articleLocalRegex = `articles|${articleLocalMapping.cymrufyw}|${articleLocalMapping.naidheachdan}`;

export const articleRegexPath = `/:service(${serviceRegex})/${articleLocalRegex}/:id(${idRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;

export const articleDataRegexPath = `${articleRegexPath}.json`;

export const articleSwRegexPath = `/:service(${serviceRegex})/:pathname(${articleLocalRegex})/sw.js`;

export const articleManifestRegexPath = `/:service(${serviceRegex})/:pathname(${articleLocalRegex})/manifest.json`;

export const frontpageRegexPath = `/:service(${serviceRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;

export const frontpageDataRegexPath = `${frontpageRegexPath}.json`;

export const frontpageManifestRegexPath = `/:service(${serviceRegex})/manifest.json`;

export const frontpageSwRegexPath = `/:service(${serviceRegex})/sw.js`;

export const radioAndTvRegexPathsArray = buildRadioAndTvRoutes(
  servicesWithRadioAndTv,
);

export const radioAndTvDataRegexPath = buildRadioAndTvDataRoutes(
  servicesWithRadioAndTv,
);

export const cpsAssetPageRegexPath = `/:service(${serviceRegex})/:assetUri(${assetUriRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;
export const cpsAssetPageDataRegexPath = `${cpsAssetPageRegexPath}.json`;
