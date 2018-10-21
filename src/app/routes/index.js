import Article from '../containers/Article';
import ArchivedArticle from '../containers/ArchivedArticle';
import getInitialData from './getInitialData';
import services from '../lib/config/services';

const serviceRegex = Object.keys(services)
  .filter(serviceName => serviceName !== 'default')
  .join('|');
const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';

export const articleRegexPath = `/:service(${serviceRegex})/articles/:id(${idRegex}):amp(${ampRegex})?`;
export const archivedArticle = `/archive`;

const routes = [
  {
    path: articleRegexPath,
    exact: true,
    component: Article,
    getInitialData,
  },
  {
    path: archivedArticle,
    exact: true,
    component: ArchivedArticle,
  },
];

export default routes;
