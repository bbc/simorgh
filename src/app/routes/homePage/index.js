import { HomePage } from '#pages';
import { homePagePath } from '#app/routes/utils/regex';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: [homePagePath],
  exact: true,
  component: HomePage,
  getInitialData,
  pageType: HOME_PAGE,
};
