import { errorPagePath } from '../../lib/utilities/getRoutePath';
import enhancePage from './enhancePage';
import ErrorPage from '../../containers/ErrorMain';
import getInitialData from './getInitialData';

const PAGE_TYPE = 'error';
const component = enhancePage(ErrorPage);

export default {
  path: errorPagePath,
  exact: true,
  component,
  getInitialData,
  pageType: PAGE_TYPE,
};
