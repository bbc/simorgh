import { IdxPage } from '#pages';
import getInitialData from './getInitialData';
import { IdxPagePath } from '../utils/regex';

export default {
  path: IdxPagePath,
  exact: true,
  component: IdxPage,
  getInitialData,
  pageType: 'IDX',
};
