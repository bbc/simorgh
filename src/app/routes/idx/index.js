import { IDXPage } from '#pages';
import getInitialData from './getInitialData';
import { idxPagePath } from '../utils/regex';

export default {
  path: idxPagePath,
  exact: true,
  component: IDXPage,
  getInitialData,
  // getInitialData: () => Promise.resolve({ status: 200 }),
  pageType: 'idx',
};
