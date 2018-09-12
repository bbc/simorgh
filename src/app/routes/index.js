import Article from '../containers/Article';
import getInitialData from './getInitialData';

const routes = [
  {
    path: '/:service/articles/:id',
    exact: true,
    component: Article,
    getInitialData,
  },
  {
    path: '/:service/articles/amp/:id',
    exact: true,
    component: Article,
    getInitialData,
  },
];

export default routes;
