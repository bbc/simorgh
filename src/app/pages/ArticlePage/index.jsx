import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

import withOptimizely from '#app/containers/PageHandlers/withOptimizely';

export default withOptimizely(
  applyBasicPageHandlers({
    addVariantHandling: true,
  })(ArticlePage),
);
