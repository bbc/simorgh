import Article from '#pages/Article';
import getInitialData from './getInitialData';
import { articlePath } from '../regex';

export default {
  path: articlePath,
  exact: true,
  component: Article,
  getInitialData,
  pageType: 'article',
};
