import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

import withOptimizelyProvider from '#app/containers/PageHandlers/withOptimizelyProvider';

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(withOptimizelyProvider(ArticlePage));
