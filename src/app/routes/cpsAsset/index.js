import { memo } from 'react';
import path from 'ramda/src/path';
import pageIsSame from '../utils/pageIsSame';
import getInitialData from './getInitialData';
import {
  ErrorPage,
  FrontPage,
  MediaAssetPage,
  PhotoGalleryPage,
  StoryPage,
} from '#pages';
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
    : ErrorPage({ ...props, pageType: 'error', errorCode: 404 });
};

export default {
  path: [cpsAssetPagePath, legacyAssetPagePath],
  exact: true,
  component: memo(CpsAsset, pageIsSame),
  getInitialData,
  pageType: 'cpsAsset',
};
