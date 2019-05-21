import Article from '../containers/Article';
import getArticleInitialData from './getInitialData/article';
import { articleRegexPath } from './regex';

const routes = [
  {
    path: articleRegexPath,
    exact: true,
    component: Article,
    getInitialData: getArticleInitialData,
  },
];

export default routes;
