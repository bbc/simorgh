import { articlePath } from '../../lib/utilities/getRoutePath';
import enhancePage from './enhancePage';
import ArticlePage from '../../containers/ArticleMain';
import getInitialData from './getInitialData';

const component = enhancePage(ArticlePage);

export default {
  component,
  getInitialData,
  path: articlePath,
  exact: true,
};
