import { FrontPage } from '#pages';
import getInitialData from './getInitialData';
import { frontPagePath } from '../utils/regex';

export default {
  path: frontPagePath,
  exact: true,
  component: FrontPage,
  getInitialData,
  pageType: 'frontPage',
};
