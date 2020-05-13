import { IDXPage } from '#pages';
import { idxPagePath } from '../utils/regex';

export default {
  path: idxPagePath,
  exact: true,
  component: IDXPage,
  getInitialData: () => Promise.resolve({ status: 200 }),
  pageType: 'idx',
};
