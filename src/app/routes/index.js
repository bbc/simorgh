import Article from '../containers/Article';
import FrontPage from '../containers/FrontPage';
import MediaPage from '../containers/MediaPage';
import ErrorPage from '../containers/Error';
import getArticleInitialData from './getInitialData/article';
import getFrontpageInitialData from './getInitialData/frontpage';
import getMediaPageInitialData from './getInitialData/mediapage';
import getMediaAssetPageInitialData from './getInitialData/mediaAssetPage';

import {
  articleRegexPath,
  frontpageRegexPath,
  mediaRadioAndTvRegexPathsArray,
  mediaAssetPageRegexPath,
} from './regex';

const routes = [
  {
    path: articleRegexPath,
    exact: true,
    component: Article,
    getInitialData: getArticleInitialData,
    pageType: 'article',
  },
  {
    path: frontpageRegexPath,
    exact: true,
    component: FrontPage,
    getInitialData: getFrontpageInitialData,
    pageType: 'frontPage',
  },
  {
    path: mediaRadioAndTvRegexPathsArray,
    exact: true,
    component: MediaPage,
    getInitialData: getMediaPageInitialData,
    pageType: 'media',
  },
  {
    path: mediaAssetPageRegexPath,
    exact: true,
    component: MediaPage,
    getInitialData: getMediaAssetPageInitialData,
    pageType: 'MAP',
  },
  {
    component: ErrorPage,
    getInitialData: () => Promise.resolve({ status: 404 }),
    pageType: 'error',
  },
];

export default routes;
