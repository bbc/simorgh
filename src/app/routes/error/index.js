import { ErrorPage } from '#pages';
import { errorPagePath } from '#routes/utils/regex';
import { ERROR_PAGE } from '#routes/utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: errorPagePath,
  exact: true,
  component: ErrorPage,
  getInitialData: getInitialData(errorPagePath),
  pageType: ERROR_PAGE,
};
