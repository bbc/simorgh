import FrontPage from '#pages/FrontPage';
import getInitialData from './getInitialData';
import { frontPagePath } from '../regex';

export default {
  path: frontPagePath,
  exact: true,
  component: FrontPage,
  getInitialData,
  pageType: 'frontPage',
};
