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

  switch (type) {
    case STORY_PAGE:
      return StoryPage({ ...props, pageType: type });
    case PHOTO_GALLERY_PAGE:
      return PhotoGalleryPage({ ...props, pageType: type });
    case MEDIA_ASSET_PAGE:
      return MediaAssetPage({ ...props, pageType: type });
    case FEATURE_INDEX_PAGE:
      return FrontPage({ ...props, pageType: type });
    default:
      // Return 404 error page if page type does not match those above
      return ErrorPage({ ...props, pageType: 'error', status: 404 });
  }
};

export default {
  path: [cpsAssetPagePath, legacyAssetPagePath],
  exact: true,
  component: CpsAsset,
  getInitialData,
  pageType: 'cpsAsset',
};
