import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import ArticlePage from './MediaArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const OptimizelyArticle = withOptimizelyProvider(ArticlePage);

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(OptimizelyArticle);
