import pathOr from 'ramda/src/pathOr';
import Article from '../containers/Article';
import FrontPage from '../containers/FrontPage';
import RadioPage from '../containers/RadioPage';
import CpsAssetPage from '../containers/CpsAssetPage';
import ErrorPage from '../containers/Error';
import getInitialData from './getInitialData';
import {
  articlePath,
  frontPagePath,
  cpsAssetPagePath,
  errorPagePath,
  radioAndTvPath,
} from './regex';

const CpsAsset = props => {
  const type = pathOr('STY', ['pageData', 'metadata', 'type'], props);
  const Page = type === 'FIX' ? FrontPage : CpsAssetPage;
  return Page({ ...props, pageType: type });
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
    pageType: 'MAP',
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
