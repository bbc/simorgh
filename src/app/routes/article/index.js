import { ArticlePage } from '#pages';
import { articlePath } from '#utils/regex';
import { ARTICLE_PAGE } from '#utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: articlePath,
  exact: true,
  component: ArticlePage,
  getInitialData,
  pageType: ARTICLE_PAGE,
};
