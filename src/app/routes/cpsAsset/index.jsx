import React from 'react';
import path from 'ramda/src/path';
import {
  ErrorPage,
  MediaAssetPage,
  PhotoGalleryPage,
  StoryPage,
  FeatureIdxPage,
} from '#pages';
import getInitialData from './getInitialData';
import { cpsAssetPagePath, legacyAssetPagePath } from '../utils/regex';
import {
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  ERROR_PAGE,
  CORRESPONDENT_STORY_PAGE,
} from '../utils/pageTypes';

// CPS Asset Mapping to PageType
const CpsAsset = props => {
  const type = path(['pageData', 'metadata', 'type'], props);

  const PageType = {
    [STORY_PAGE]: StoryPage,
    [CORRESPONDENT_STORY_PAGE]: StoryPage,
    [PHOTO_GALLERY_PAGE]: PhotoGalleryPage,
    [MEDIA_ASSET_PAGE]: MediaAssetPage,
    [FEATURE_INDEX_PAGE]: FeatureIdxPage,
  }[type];

  return PageType ? (
    <PageType {...props} pageType={type} />
  ) : (
    <ErrorPage {...props} pageType={ERROR_PAGE} errorCode={404} />
  );
};

export default {
  path: [cpsAssetPagePath, legacyAssetPagePath],
  exact: true,
  component: CpsAsset,
  getInitialData,
  pageType: 'cpsAsset',
};
