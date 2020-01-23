import { frontPagePath } from '../../lib/utilities/getRoutePath';
import enhancePage from './enhancePage';
import FrontPage from '../../containers/FrontPageMain';
import getInitialData from './getInitialData';

const PAGE_TYPE = 'frontPage';
const component = enhancePage(FrontPage);

export default {
  component,
  getInitialData,
  pageType: PAGE_TYPE,
  path: frontPagePath,
  exact: true,
};
