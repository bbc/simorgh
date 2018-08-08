import Article from '../containers/Article';

const routes = [
  {
    path: '/article/:id',
    exact: true,
    component: Article,
  },
  {
    path: '/article/amp',
    exact: true,
    component: Article,
  },
];

export default routes;
