import { OfflinePage } from '#pages';
import { offlinePagePath } from '#app/routes/utils/regex';
import { OFFLINE_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: offlinePagePath,
  exact: true,
  component: OfflinePage,
  getInitialData,
  pageType: OFFLINE_PAGE,
};
