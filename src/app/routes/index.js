import Article from '../containers/Article';
import Slate from '../components/Slate';
import Hybrid from '../components/Hybrid';

const routes = [
  {
    path: '/news/articles/:id',
    exact: true,
    component: Article,
  },
  {
    path: '/news/articles/amp/:id',
    exact: true,
    component: Article,
  },
  {
    path: '/slate',
    exact: true,
    component: Slate,
  },
  {
    path: '/hybrid',
    exact: true,
    component: Hybrid,
  },
];

export default routes;
