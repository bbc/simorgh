import ErrorPage from '#pages/Error';
import { errorPagePath } from '../utils/regex';

export default {
  path: errorPagePath,
  exact: true,
  component: ErrorPage,
  getInitialData: () => Promise.resolve({ status: 200 }),
  pageType: 'error',
};
