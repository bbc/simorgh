import { cpsAssetPagePath } from '../../lib/utilities/getRoutePath';
import enhancePage from './enhancePage';
import CpsAssetPage from '../../containers/CpsAssetPageMain';
import getInitialData from './getInitialData';

const PAGE_TYPE = 'cpsAsset';
const component = enhancePage(CpsAssetPage);

export default {
  component,
  getInitialData,
  pageType: PAGE_TYPE,
  path: cpsAssetPagePath,
  exact: true,
};
