import 'babel-polyfill';
import { hydrateClient } from '@jtart/uni';
import routes from './app/routes';

hydrateClient(routes);

if (module.hot) {
  module.hot.accept();
}
