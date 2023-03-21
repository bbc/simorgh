import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import { ThemeWrapper } from '#app/contexts/ThemeContextPOC';
import MediaArticlePage from './MediaArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const OptimizelyMediaArticle = withOptimizelyProvider(MediaArticlePage);
const DarkModeMediaArticle = ThemeWrapper(OptimizelyMediaArticle);

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(DarkModeMediaArticle);
