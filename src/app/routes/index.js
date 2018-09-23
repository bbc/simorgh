import Article from '../containers/Article';

const routes = [
  {
    path: '/:service/articles/:id',
    exact: true,
    component: Article,
  },
  {
    path: '/:service/articles/amp/:id',
    exact: true,
    component: Article,
  },
];

export default routes;
