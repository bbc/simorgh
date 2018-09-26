import Article from '../containers/Article';
import getInitialData from './getInitialData';

const serviceRegex = 'news|persian';
const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';

const routes = [
  {
    path: `/:service(${serviceRegex})/articles/:id(${idRegex}):amp(${ampRegex})?`,
    exact: true,
    component: Article,
    getInitialData,
  },
];

export default routes;
