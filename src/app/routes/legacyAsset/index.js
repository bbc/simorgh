import getInitialData from '../getInitialData';
import { legacyAssetPagePath } from '../regex';
import LegacyAsset from '../utils/asset';

export default {
  path: legacyAssetPagePath,
  exact: true,
  component: LegacyAsset,
  getInitialData,
  pageType: 'legacyAsset',
};
