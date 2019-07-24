import Article from '../containers/Article';
import FrontPage from '../containers/FrontPage';
import MediaPage from '../containers/MediaPage';
import getArticleInitialData from './getInitialData/article';
import getFrontpageInitialData from './getInitialData/frontpage';
import getMediaPageInitialData from './getInitialData/mediapage';
import {
  articleRegexPath,
  frontpageRegexPath,
  mediaRadioRegexArray,
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
    path: mediaRadioRegexArray,
    exact: true,
    component: MediaPage,
    getInitialData: getMediaPageInitialData,
    pageType: 'media',
  },
];

export default routes;
