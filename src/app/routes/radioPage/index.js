import { radioAndTvPath } from '../../lib/utilities/getRoutePath';
import enhancePage from './enhancePage';
import RadioPage from '../../containers/RadioPageMain';
import getInitialData from './getInitialData';

const PAGE_TYPE = 'media';
const component = enhancePage(RadioPage);

export default {
  component,
  getInitialData,
  pageType: PAGE_TYPE,
  path: radioAndTvPath,
  exact: true,
};
