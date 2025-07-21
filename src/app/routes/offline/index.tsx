import { offlinePagePath } from '#app/routes/utils/regex';
import { OFFLINE_PAGE } from '#app/routes/utils/pageTypes';
import { OfflinePage } from '#app/pages';
import getInitialData from './getInitialData';

export default {
  path: offlinePagePath,
  exact: true,
  component: OfflinePage,
  getInitialData,
  pageType: OFFLINE_PAGE,
};
