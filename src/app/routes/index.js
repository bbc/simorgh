import Article from '../containers/Article';
import getInitialData from './getInitialData';
import services from '../lib/config/services';

const serviceRegex = Object.keys(services)
  .filter(serviceName => serviceName !== 'default')
  .join('|');
const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';

export const articleRegexPath = `/:service(${serviceRegex})/articles/:id(${idRegex}):amp(${ampRegex})?`;

const routes = [
  {
    path: articleRegexPath,
    exact: true,
    component: Article,
    getInitialData,
  },
];

export default routes;
