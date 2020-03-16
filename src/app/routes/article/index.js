import { ArticlePage } from '#pages';
import getInitialData from './getInitialData';
import { articlePath } from '../utils/regex';

export default {
  path: articlePath,
  exact: true,
  component: ArticlePage,
  getInitialData,
  pageType: 'article',
};
