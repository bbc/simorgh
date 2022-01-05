import withOptimizelyProvider from '#app/containers/PageHandlers/withOptimizelyProvider';
import isLive from '#lib/utilities/isLive';
import StoryPage from './StoryPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const OptimizelyStoryPage = withOptimizelyProvider(StoryPage, isLive());

export default applyBasicPageHandlers({
  addVariantHandling: false,
})(OptimizelyStoryPage);
