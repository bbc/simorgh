import Article from '../containers/Article';
import Frontpage from '../containers/Frontpage';
import getArticleInitialData from './getInitialData/article';
import getFrontpageInitialData from './getInitialData/frontpage';
import services from '../lib/config/services';

const serviceRegex = type =>
  Object.keys(services)
    .filter(serviceName => serviceName !== 'default')
    .filter(serviceName => services[serviceName][type] === true)
    .join('|');
const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';

export const articleRegexPath = `/:service(${serviceRegex(
  'article',
)})/articles/:id(${idRegex}):amp(${ampRegex})?`;

export const articleDataRegexPath = `${articleRegexPath}.json`;

export const frontpageRegexPath = `/:service(${serviceRegex(
  'frontpage',
)}):amp(${ampRegex})?`;

export const frontpageDataRegexPath = `${frontpageRegexPath}.json`;

export const swRegexPath = `/:service(${serviceRegex('sw')})/articles/sw.js`;

export const manifestRegexPath = `/:service(${serviceRegex(
  'manifest',
)})/articles/manifest.json`;

const routes = [
  {
    path: articleRegexPath,
    exact: true,
    component: Article,
    getInitialData: getArticleInitialData,
  },
  {
    path: frontpageRegexPath,
    exact: true,
    component: Frontpage,
    getInitialData: getFrontpageInitialData,
  },
];

export default routes;
