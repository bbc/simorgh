import { radioAndTvPath } from '../../lib/utilities/getRoutePath';
import enhancePage from './enhancePage';
import RadioPage from '../../containers/RadioPageMain';
import getInitialData from './getInitialData';

const component = enhancePage(RadioPage);

export default {
  component,
  getInitialData,
  path: radioAndTvPath,
  exact: true,
};
