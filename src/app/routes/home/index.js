import { FrontPage } from '#pages';
import { frontPagePath } from '#utils/regex';
import { FRONT_PAGE } from '#utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: frontPagePath,
  exact: true,
  component: FrontPage,
  getInitialData,
  pageType: FRONT_PAGE,
};
