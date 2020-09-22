import { MostWatchedPage } from '#pages';
import getInitialData from './getInitialData';
import { mostWatchedPagePath } from '../utils/regex';

export default {
  path: mostWatchedPagePath,
  exact: true,
  component: MostWatchedPage,
  getInitialData,
  pageType: 'mostWatched',
};
