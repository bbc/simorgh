import StoryPage from './StoryPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';
import isLive from '#lib/utilities/isLive';

import withOptimizelyProvider from '#app/containers/PageHandlers/withOptimizelyProvider';

const OptimizelyStoryPage = withOptimizelyProvider(StoryPage, isLive());

export default applyBasicPageHandlers({
  addVariantHandling: false,
})(OptimizelyStoryPage);
