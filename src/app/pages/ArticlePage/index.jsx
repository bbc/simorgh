import { ThemeWrapper } from '#app/contexts/ThemeContextPOC/ThemeContextPOC';
import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const DarkModeArticle = ThemeWrapper(ArticlePage);

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(DarkModeArticle);
