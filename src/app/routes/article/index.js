import getInitialData from '../fetchPageData';
import Article from '#pages/Article';
import { articlePath } from '../regex';

export default {
  path: articlePath,
  exact: true,
  component: Article,
  getInitialData,
  pageType: 'article',
};
