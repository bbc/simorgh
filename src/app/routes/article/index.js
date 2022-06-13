import { ArticlePage } from '#pages';
import { articlePath } from '#app/routes/utils/regex';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: articlePath,
  exact: true,
  component: ArticlePage,
  getInitialData,
  pageType: ARTICLE_PAGE,
};
