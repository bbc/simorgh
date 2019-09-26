import Article from '../containers/Article';
import FrontPage from '../containers/FrontPage';
import MediaPage from '../containers/MediaPage';
import ErrorPage from '../containers/Error';
import getArticleInitialData from './getInitialData/article';
import getFrontpageInitialData from './getInitialData/frontpage';
import getMediaPageInitialData from './getInitialData/mediapage';
import getCpsAssetInitialData from './getInitialData/cpsAsset';
import {
  articleRegexPath,
  frontpageRegexPath,
  mediaRadioAndTvRegexPathsArray,
  cpsAssetPageRegexPath,
} from './regex';

const pages = {
  MAP: MediaPage,
  FIX: FrontPage,
};

const CpsAsset = props => {
  const { type } = props.data.pageData.metadata;
  const Page = pages[type];
  return Page({ ...props, pageType: type });
};

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
    path: cpsAssetPageRegexPath,
    exact: true,
    component: CpsAsset,
    getInitialData: getCpsAssetInitialData,
    pageType: 'MAP',
  },
  {
    component: ErrorPage,
    getInitialData: () => Promise.resolve({ status: 404 }),
    pageType: 'error',
  },
];

export default routes;
