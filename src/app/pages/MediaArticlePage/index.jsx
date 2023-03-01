import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import MediaArticlePage from './MediaArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const OptimizelyMediaArticle = withOptimizelyProvider(MediaArticlePage);

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(OptimizelyMediaArticle);
