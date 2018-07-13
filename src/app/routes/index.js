import Article from '../components/Article';
import NotFound from '../components/NotFound';

const routes = [
  {
    path: '/article/:id',
    exact: true,
    component: Article,
  },
  {
    component: NotFound,
  },
];

export default routes;
