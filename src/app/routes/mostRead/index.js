import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import { mostReadPagePath } from '#app/routes/utils/regex';
import { MostReadPage } from '#pages';
import getInitialData from './getInitialData';

export default {
  path: mostReadPagePath,
  exact: true,
  component: MostReadPage,
  getInitialData,
  pageType: MOST_READ_PAGE,
};
