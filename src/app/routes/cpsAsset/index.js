import path from 'ramda/src/path';
import getInitialData from '../fetchPageData';
import MediaAssetPage from '#pages/MediaAssetPage';
import StoryPage from '#pages/Story';
import PhotoGalleryPage from '#pages/PhotoGallery';
import FrontPage from '#pages/FrontPage';
import ErrorPage from '#pages/Error';
import { cpsAssetPagePath } from '../regex';
import {
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
} from '../pageTypes';

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
  path: cpsAssetPagePath,
  exact: true,
  component: CpsAsset,
  getInitialData,
  pageType: 'cpsAsset',
};
