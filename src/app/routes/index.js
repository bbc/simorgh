import Article from '../containers/Article';

const routes = [
  {
    path: '/articles/:id',
    exact: true,
    component: Article,
  },
  {
    path: '/articles/amp/:id',
    exact: true,
    component: Article,
  },
];

export default routes;
