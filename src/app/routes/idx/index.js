import { IdxPage } from '#pages';
import getInitialData from './getInitialData';
import { IdxPagePath } from '#utils/regex';
import { INDEX_PAGE } from '#utils/pageTypes';

export default {
  path: IdxPagePath,
  exact: true,
  component: IdxPage,
  getInitialData,
  pageType: INDEX_PAGE,
};
