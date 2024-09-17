import { MostReadPage } from '#pages';
import { mostReadPagePath } from '#routes/utils/regex';
import { MOST_READ_PAGE } from '#routes/utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: mostReadPagePath,
  exact: true,
  component: MostReadPage,
  getInitialData,
  pageType: MOST_READ_PAGE,
};
