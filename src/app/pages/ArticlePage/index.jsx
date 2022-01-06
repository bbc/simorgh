import withOptimizelyProvider from '#app/containers/PageHandlers/withOptimizelyProvider';
import isLive from '#lib/utilities/isLive';
import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const hasUserId = !isLive();
const OptimizelyArticle = withOptimizelyProvider(ArticlePage, hasUserId);

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(OptimizelyArticle);
