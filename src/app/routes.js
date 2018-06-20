import Article from './components/Article';

const routes = [
  {
    path: '/article/:id',
    exact: true,
    component: Article,
  },
];

export default routes;
