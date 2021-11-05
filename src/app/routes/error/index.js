import { ErrorPage } from '#pages';
import getInitialData from './getInitialData';
import { errorPagePath } from '#utils/regex';
import { ERROR_PAGE } from '#utils/pageTypes';

export default {
  path: errorPagePath,
  exact: true,
  component: ErrorPage,
  getInitialData: getInitialData(errorPagePath),
  pageType: ERROR_PAGE,
};
