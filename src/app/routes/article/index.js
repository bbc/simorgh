import { ArticlePage } from '#pages';
import getInitialData from './getInitialData';
import { articlePath } from '../utils/regex';
import { ARTICLE_PAGE } from '../utils/pageTypes';

export default {
  path: articlePath,
  exact: true,
  component: ArticlePage,
  getInitialData,
  pageType: ARTICLE_PAGE,
};
