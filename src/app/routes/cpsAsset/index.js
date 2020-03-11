import { memo } from 'react';
import path from 'ramda/src/path';
import getInitialData from './getInitialData';
import { MediaAssetPage, PhotoGalleryPage, StoryPage, FrontPage } from '#pages';
import ErrorPage from '#pages/Error';
import { cpsAssetPagePath, legacyAssetPagePath } from '../utils/regex';
import {
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
} from '../utils/pageTypes';

// CPS Asset Mapping to PageType
const CpsAsset = props => {
  const type = path(['pageData', 'metadata', 'type'], props);

  const PageType = {
    [STORY_PAGE]: StoryPage,
    [PHOTO_GALLERY_PAGE]: PhotoGalleryPage,
    [MEDIA_ASSET_PAGE]: MediaAssetPage,
    [FEATURE_INDEX_PAGE]: FrontPage,
  }[type];

  return PageType
    ? PageType({ ...props, pageType: type })
    : ErrorPage({ ...props, pageType: 'error', status: 404 });
};

const getAssetId = path(['pageData', 'metadata', 'id']);
const pageIsSame = (prevProps, nextProps) =>
  getAssetId(prevProps) === getAssetId(nextProps);

export default {
  path: [cpsAssetPagePath, legacyAssetPagePath],
  exact: true,
  component: memo(CpsAsset, pageIsSame),
  getInitialData,
  pageType: 'cpsAsset',
};
