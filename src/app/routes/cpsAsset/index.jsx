import React from 'react';
import path from 'ramda/src/path';
import getInitialData from './getInitialData';
import {
  ErrorPage,
  MediaAssetPage,
  PhotoGalleryPage,
  StoryPage,
  FeatureIdxPage,
} from '#pages';
import { allServices } from '../utils/regex';
import {
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  ERROR_PAGE,
  CORRESPONDENT_STORY_PAGE,
} from '../utils/pageTypes';

// const assetUriRegex = '[a-z0-9-_]{0,}[0-9]{8,}';
// const legacyAssetUriRegex = '[a-z0-9-_]{1,}/[a-z0-9-_/]{1,}';

// `/:service(${serviceRegex}):variant(${variantRegex})?/:assetUri(${assetUriRegex}):amp(${ampRegex})?`;

const CANONICAL_PATHS = allServices.map(service => `/${service}/:assetUri`);
const CANONICAL_SERVICE_VARIANT_PATHS = [
  '/zhongwen/simp/:assetUri',
  '/zhongwen/trad/:assetUri',
  '/serbian/cyr/:assetUri',
  '/serbian/lat/:assetUri',
];

const AMP_PATHS = CANONICAL_PATHS.map(canonicalPath => `${canonicalPath}.amp`);
const AMP_SERVICE_VARIANT_PATH = CANONICAL_SERVICE_VARIANT_PATHS.map(
  canonicalPath => `${canonicalPath}.amp`,
);

const getCpsAssetPageType = path(['pageData', 'metadata', 'type']);

const component = props => {
  const pageType = getCpsAssetPageType(props);

  const Component = {
    [STORY_PAGE]: StoryPage,
    [CORRESPONDENT_STORY_PAGE]: StoryPage,
    [PHOTO_GALLERY_PAGE]: PhotoGalleryPage,
    [MEDIA_ASSET_PAGE]: MediaAssetPage,
    [FEATURE_INDEX_PAGE]: FeatureIdxPage,
  }[pageType];

  return Component ? (
    <Component {...props} pageType={pageType} />
  ) : (
    <ErrorPage {...props} pageType={ERROR_PAGE} errorCode={404} />
  );
};

const pageType = 'cpsAsset';

const cpsAssetRoutes = [
  CANONICAL_PATHS,
  CANONICAL_SERVICE_VARIANT_PATHS,
  AMP_PATHS,
  AMP_SERVICE_VARIANT_PATH,
].map(cpsAssetPath => ({
  path: cpsAssetPath,
  component,
  getInitialData,
  pageType,
}));

export default cpsAssetRoutes;
