import { MostReadPage } from '#pages';
import getInitialData from './getInitialData';
import { mostReadPagePath } from '../utils/regex';
import { MOST_READ_PAGE } from '../utils/pageTypes';

export default {
  path: mostReadPagePath,
  exact: true,
  component: MostReadPage,
  getInitialData,
  pageType: MOST_READ_PAGE,
};
