import Home from './components/Home';
import { asyncComponent } from '@jaredpalmer/after';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/article',
    component: asyncComponent({
      loader: () => import('./components/Article'), // required
    })
  }
];

export default routes;
