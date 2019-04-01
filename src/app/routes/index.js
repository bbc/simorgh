import Article from '../containers/Article';
import HomePage from '../containers/HomePage';
import getArticleData from './getArticleData';
import getIndexData from './getIndexData';
import services from '../lib/config/services';

const serviceRegex = Object.keys(services)
  .filter(serviceName => serviceName !== 'default')
  .join('|');
const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';

export const articleRegexPath = `/:service(${serviceRegex})/articles/:id(${idRegex}):amp(${ampRegex})?`;

export const articleDataRegexPath = `${articleRegexPath}.json`;

export const homePageRegexPath = `/:service(${serviceRegex})`;

export const homePageDataRegexPath = `/:service(${serviceRegex})/index/front_page.json`;

export const swRegexPath = `/:service(${serviceRegex})/articles/sw.js`;

export const manifestRegexPath = `/:service(${serviceRegex})/articles/manifest.json`;

const routes = [
  {
    path: articleRegexPath,
    exact: true,
    component: Article,
    data: getArticleData,
  },
  {
    path: homePageRegexPath,
    exact: true,
    component: HomePage,
    data: getIndexData,
  },
];

export default routes;
