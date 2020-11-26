import { MostWatchedPage } from '#pages';
import getInitialData from './getInitialData';
import { mostWatchedPagePath } from '../utils/regex';
import { MOST_WATCHED_PAGE } from '../utils/pageTypes';

export default {
  path: mostWatchedPagePath,
  exact: true,
  component: MostWatchedPage,
  getInitialData,
  pageType: MOST_WATCHED_PAGE,
};
