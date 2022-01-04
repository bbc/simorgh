import StoryPage from './StoryPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';
import isLive from '#lib/utilities/isLive';

import withOptimizelyProvider from '#app/containers/PageHandlers/withOptimizelyProvider';

const hasUserId = !isLive();
const OptimizelyStoryPage = withOptimizelyProvider(StoryPage, hasUserId);

export default applyBasicPageHandlers({
  addVariantHandling: false,
})(OptimizelyStoryPage);
