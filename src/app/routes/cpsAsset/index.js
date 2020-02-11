import getInitialData from '../getInitialData';
import { cpsAssetPagePath } from '../regex';
import CpsAsset from '../utils/asset';

export default {
  path: cpsAssetPagePath,
  exact: true,
  component: CpsAsset,
  getInitialData,
  pageType: 'cpsAsset',
};
