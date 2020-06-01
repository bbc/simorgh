import { IdxPage } from '#pages';
import { IdxPagePath } from '../utils/regex';
import getInitialData from './getInitialData';

export default {
  path: IdxPagePath,
  exact: true,
  component: IdxPage,
  getInitialData,
  pageType: 'IDX',
};
