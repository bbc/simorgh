import Article from '../containers/Article';
import FrontPage from '../containers/FrontPage';
import FeatureIndex from '../containers/FeatureIndex';
import RadioPage from '../containers/RadioPage';
import CpsAssetPage from '../containers/CpsAssetPage';
import ErrorPage from '../containers/Error';
import getArticleInitialData from './getInitialData/article';
import getFrontpageInitialData from './getInitialData/frontpage';
import getCpsAssetInitialData from './getInitialData/cpsAsset';
import getRadioPageInitialData from './getInitialData/radioPage';
import {
  articleRegexPath,
  frontpageRegexPath,
  cpsAssetPageRegexPath,
  radioAndTvRegexPathsArray,
} from './regex';

const pages = {
  MAP: CpsAssetPage,
  FIX: FeatureIndex,
  error: ErrorPage,
};

const CpsAsset = props => {
  const pageData = props.pageData || {};
  const { type } = pageData.metadata || { type: 'error' };
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
    path: radioAndTvRegexPathsArray,
    exact: true,
    component: RadioPage,
    getInitialData: getRadioPageInitialData,
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
