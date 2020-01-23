import { errorPagePath } from '../../lib/utilities/getRoutePath';
import enhancePage from './enhancePage';
import ErrorPage from '../../containers/ErrorMain';
import getInitialData from './getInitialData';

const component = enhancePage(ErrorPage);

export default {
  path: errorPagePath,
  exact: true,
  component,
  getInitialData,
};
