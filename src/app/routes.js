import Article from './components/Article';
import Status from './components/Status';

const routes = [
  {
    path: '/',
    exact: true,
    component: Article,
  },
  {
    path: '/status',
    exact: true,
    component: Status,
  },
];

export default routes;
