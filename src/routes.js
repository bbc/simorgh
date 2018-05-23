import Home from './components/Home';
import Article from './components/Article';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/article',
    component: Article,
  },
];

export default routes;
