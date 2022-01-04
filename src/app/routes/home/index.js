import { FrontPage } from '#pages';
import getInitialData from './getInitialData';
import { frontPagePath } from '#utils/regex';
import { FRONT_PAGE } from '#utils/pageTypes';

export default {
  path: frontPagePath,
  exact: true,
  component: FrontPage,
  getInitialData,
  pageType: FRONT_PAGE,
};
