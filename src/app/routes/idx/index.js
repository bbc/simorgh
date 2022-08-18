import { IdxPage } from '#pages';
import { IdxPagePath } from '#app/routes/utils/regex';
import { INDEX_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: IdxPagePath,
  exact: true,
  component: IdxPage,
  getInitialData,
  pageType: INDEX_PAGE,
};
