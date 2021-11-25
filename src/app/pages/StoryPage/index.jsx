import StoryPage from './StoryPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

import withOptimizely from '#app/containers/PageHandlers/withOptimizely';

export default applyBasicPageHandlers({
  addVariantHandling: false,
})(withOptimizely(StoryPage));
