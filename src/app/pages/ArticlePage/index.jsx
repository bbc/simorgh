import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';
import isLive from '#lib/utilities/isLive';

import withOptimizelyProvider from '#app/containers/PageHandlers/withOptimizelyProvider';

const OptimizelyArticle = withOptimizelyProvider(ArticlePage, isLive());

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(OptimizelyArticle);
