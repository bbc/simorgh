import cpsAssetRoute from '../cpsAsset';
import { legacyAssetPagePath } from '../regex';

export default {
  ...cpsAssetRoute,
  path: legacyAssetPagePath,
  pageType: 'legacyAsset',
};
