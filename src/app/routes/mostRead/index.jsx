import { MostReadPage } from '#pages';
import getInitialData from './getInitialData';
import { mostReadPagePath } from '../utils/regex';

export default {
  path: mostReadPagePath,
  exact: true,
  component: MostReadPage,
  getInitialData,
  // getInitialData: () => Promise.resolve({ status: 200 }),
  pageType: 'mostRead',
};
