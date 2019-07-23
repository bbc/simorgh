import Article from '../containers/Article';
import ErrorPage from '../components/ErrorPage';
import FrontPage from '../containers/FrontPage';
import getArticleInitialData from './getInitialData/article';
import getErrorInitialData from './getInitialData/errorpage';
import getFrontpageInitialData from './getInitialData/frontpage';
import {
  articleRegexPath,
  errorPageRegexPath,
  frontpageRegexPath,
} from './regex';

const routes = [
  {
    path: errorPageRegexPath,
    exact: true,
    component: ErrorPage,
    getInitialData: getErrorInitialData,
    pageType: 'errorPage',
  },
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
];

export default routes;
