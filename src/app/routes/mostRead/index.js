import { MostReadPage } from '#pages';
import { mostReadPagePath } from '#utils/regex';
import { MOST_READ_PAGE } from '#utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: mostReadPagePath,
  exact: true,
  component: MostReadPage,
  getInitialData,
  pageType: MOST_READ_PAGE,
};
