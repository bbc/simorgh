import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const OptimizelyArticle = withOptimizelyProvider(ArticlePage);

export default applyBasicPageHandlers(OptimizelyArticle);
