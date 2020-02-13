import getInitialData from '../fetchPageData';
import FrontPage from '#pages/FrontPage';
import { frontPagePath } from '../regex';

export default {
  path: frontPagePath,
  exact: true,
  component: FrontPage,
  getInitialData,
  pageType: 'frontPage',
};
