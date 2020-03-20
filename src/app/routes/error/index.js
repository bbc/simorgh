import { ErrorPage } from '#pages';
import getInitialData from './getInitialData';
import { errorPagePath } from '../utils/regex';

export default {
  path: errorPagePath,
  exact: true,
  component: ErrorPage,
  getInitialData: getInitialData(errorPagePath),
  pageType: 'error',
};
