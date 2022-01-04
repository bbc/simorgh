import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';
import isLive from '#lib/utilities/isLive';

import withOptimizelyProvider from '#app/containers/PageHandlers/withOptimizelyProvider';

const hasUserId = !isLive();
const OptimizelyArticle = withOptimizelyProvider(ArticlePage, hasUserId);

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(OptimizelyArticle);
