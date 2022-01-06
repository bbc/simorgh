import withOptimizelyProvider from '#app/containers/PageHandlers/withOptimizelyProvider';
import isLive from '#lib/utilities/isLive';
import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const OptimizelyArticle = withOptimizelyProvider(ArticlePage, isLive());

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(OptimizelyArticle);
