import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(ArticlePage);
