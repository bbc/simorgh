import pathOr from 'ramda/src/pathOr';
import Article from '../containers/Article';
import FrontPage from '../containers/FrontPage';
import RadioPage from '../containers/RadioPage';
import CpsAssetPage from '../containers/CpsAssetPage';
import ErrorPage from '../containers/Error';
import getInitialData from './getInitialData';
import {
  articleRegexPath,
  frontpageRegexPath,
  cpsAssetPageRegexPath,
  errorPageRegexPath,
  radioAndTvRegexPathsArray,
} from './regex';

const CpsAsset = props => {
  const type = pathOr('STY', ['pageData', 'metadata', 'type'], props);
  const Page = type === 'FIX' ? FrontPage : CpsAssetPage;
  return Page({ ...props, pageType: type });
};

const routes = [
  {
    path: articleRegexPath,
    exact: true,
    component: Article,
    getInitialData,
    pageType: 'article',
  },
  {
    path: frontpageRegexPath,
    exact: true,
    component: FrontPage,
    getInitialData,
    pageType: 'frontPage',
  },
  {
    path: radioAndTvRegexPathsArray,
    exact: true,
    component: RadioPage,
    getInitialData,
    pageType: 'media',
  },
  {
    path: cpsAssetPageRegexPath,
    exact: true,
    component: CpsAsset,
    getInitialData,
    pageType: 'MAP',
  },
  {
    path: errorPageRegexPath,
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
