import { memo } from 'react';
import path from 'ramda/src/path';
import getInitialData from '../getInitialData';
import CpsMap from '#pages/CpsMap';
import CpsSty from '#pages/CpsSty';
import CpsPgl from '#pages/CpsPgl';
import FrontPage from '#pages/FrontPage';
import ErrorPage from '#pages/Error';
import { cpsAssetPagePath } from '../regex';
import {
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
} from '../pageTypes';

const getAssetType = path(['pageData', 'metadata', 'type']);

const assetTypeIsSame = (prevProps, nextProps) =>
  getAssetType(prevProps) === getAssetType(nextProps);

// CPS Asset Mapping to PageType
const CpsAssets = {
  [STORY_PAGE]: CpsSty,
  [PHOTO_GALLERY_PAGE]: CpsPgl,
  [MEDIA_ASSET_PAGE]: CpsMap,
  [FEATURE_INDEX_PAGE]: FrontPage,
};

const Component = memo(props => {
  const type = getAssetType(props);
  const CpsAsset = CpsAssets[type];

  return CpsAsset
    ? CpsAsset({ ...props, pageType: type })
    : ErrorPage({ ...props, pageType: 'error', status: 404 });
}, assetTypeIsSame);

export default {
  path: cpsAssetPagePath,
  exact: true,
  component: Component,
  getInitialData,
  pageType: 'cpsAsset',
};
