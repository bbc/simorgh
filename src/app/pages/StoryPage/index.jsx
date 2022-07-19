import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import StoryPage from './StoryPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const OptimizelyStoryPage = withOptimizelyProvider(StoryPage);

export default applyBasicPageHandlers({
  addVariantHandling: false,
})(OptimizelyStoryPage);
