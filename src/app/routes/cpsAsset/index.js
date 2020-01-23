import { cpsAssetPagePath } from '../../lib/utilities/getRoutePath';
import enhancePage from './enhancePage';
import CpsAssetPage from '../../containers/CpsAssetPageMain';
import getInitialData from './getInitialData';

const component = enhancePage(CpsAssetPage);

export default {
  component,
  getInitialData,
  path: cpsAssetPagePath,
  exact: true,
};
