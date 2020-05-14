import { IdxPage } from '#pages';
import { IdxPagePath } from '../utils/regex';

export default {
  path: IdxPagePath,
  exact: true,
  component: IdxPage,
  getInitialData: () => Promise.resolve({ status: 200, pageData: {} }),
  pageType: 'idx',
};
