import cpsAssetRoute from '../cpsAsset';
import { legacyAssetPagePath } from '../utils/regex';

export default {
  ...cpsAssetRoute,
  path: legacyAssetPagePath,
  pageType: 'legacyAsset',
};
