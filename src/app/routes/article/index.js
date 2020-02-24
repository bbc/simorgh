import Article from '#pages/Article';
import getInitialData from './getInitialData';
import { articlePath } from '../utils/regex';

export default {
  path: articlePath,
  exact: true,
  component: Article,
  getInitialData,
  pageType: 'article',
};
