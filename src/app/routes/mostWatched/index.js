import { MostWatchedPage } from '#pages';
import { mostWatchedPagePath } from '#app/routes/utils/regex';
import { MOST_WATCHED_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: mostWatchedPagePath,
  exact: true,
  component: MostWatchedPage,
  getInitialData,
  pageType: MOST_WATCHED_PAGE,
};
