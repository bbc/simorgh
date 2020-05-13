import { IndexPage } from '#pages';
import { indexPagePath } from '../utils/regex';

export default {
  path: indexPagePath,
  exact: true,
  component: IndexPage,
  getInitialData: () => Promise.resolve({ status: 200, pageData: {} }),
  pageType: 'index',
};
