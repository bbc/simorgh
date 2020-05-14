import { IDXPage } from '#pages';
import { IDXPagePath } from '../utils/regex';

export default {
  path: IDXPagePath,
  exact: true,
  component: IDXPage,
  getInitialData: () => Promise.resolve({ status: 200, pageData: {} }),
  pageType: 'IDX',
};
