import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import { ThemeWrapper } from '#app/contexts/ThemeContextPOC/ThemeContextPOC';
import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const OptimizelyArticle = withOptimizelyProvider(ArticlePage);
const DarkModeArticle = ThemeWrapper(OptimizelyArticle);

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(DarkModeArticle);
