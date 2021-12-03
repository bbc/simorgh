import StoryPage from './StoryPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

import withOptimizelyProvider from '#app/containers/PageHandlers/withOptimizelyProvider';

export default applyBasicPageHandlers({
  addVariantHandling: false,
})(withOptimizelyProvider(StoryPage));
