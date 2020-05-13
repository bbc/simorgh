import { MostReadPage } from '#pages';
import getInitialData from './getInitialData';
import { mostReadPagePath } from '../utils/regex';

export default {
  path: mostReadPagePath,
  exact: true,
  component: MostReadPage,
  getInitialData,
  pageType: 'mostRead',
};
