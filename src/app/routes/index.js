import path from 'ramda/src/path';
import getInitialData from './getInitialData';

// Pages
import Article from '../pages/Article';
import FrontPage from '../pages/FrontPage';
import RadioPage from '../pages/RadioPage';
import CpsMap from '../pages/CpsMap';
import CpsSty from '../pages/CpsSty';
import CpsPgl from '../pages/CpsPgl';
import ErrorPage from '../pages/Error';

// Regex Matchers
import {
  articlePath,
  frontPagePath,
  cpsAssetPagePath,
  errorPagePath,
  radioAndTvPath,
} from './regex';

// Page Types
import {
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
} from './pageTypes';

// CPS Asset Mapping to PageType
const CpsAsset = props => {
  const type = path(['pageData', 'metadata', 'type'], props);

  switch (type) {
    case STORY_PAGE:
      return CpsSty({ ...props, pageType: type });
    case PHOTO_GALLERY_PAGE:
      return CpsPgl({ ...props, pageType: type });
    case MEDIA_ASSET_PAGE:
      return CpsMap({ ...props, pageType: type });
    case FEATURE_INDEX_PAGE: // TODO: Create FIX Page if required
      return FrontPage({ ...props, pageType: type });
    default:
      // Return 404 error page if page type does not match those above
      return ErrorPage({ ...props, pageType: 'error', status: 404 });
  }
};

const routes = [
  {
    path: articlePath,
    exact: true,
    component: Article,
    getInitialData,
    pageType: 'article',
  },
  {
    path: frontPagePath,
    exact: true,
    component: FrontPage,
    getInitialData,
    pageType: 'frontPage',
  },
  {
    path: radioAndTvPath,
    exact: true,
    component: RadioPage,
    getInitialData,
    pageType: 'media',
  },
  {
    path: cpsAssetPagePath,
    exact: true,
    component: CpsAsset,
    getInitialData,
    pageType: 'cpsAsset',
  },
  {
    path: errorPagePath,
    exact: true,
    component: ErrorPage,
    getInitialData: () => Promise.resolve({ status: 200 }),
    pageType: 'error',
  },
  {
    component: ErrorPage,
    getInitialData: () => Promise.resolve({ status: 404 }),
    pageType: 'error',
  },
];

export default routes;
