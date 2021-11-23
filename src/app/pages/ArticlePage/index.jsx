import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

import withOptimizely from '#app/containers/PageHandlers/withOptimizely';

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(withOptimizely(ArticlePage));
