import { articlePath } from '../../lib/utilities/getRoutePath';
import enhancePage from './enhancePage';
import ArticlePage from '../../containers/ArticleMain';
import getInitialData from './getInitialData';

const PAGE_TYPE = 'article';
const component = enhancePage(ArticlePage);

export default {
  component,
  getInitialData,
  pageType: PAGE_TYPE,
  path: articlePath,
  exact: true,
};
