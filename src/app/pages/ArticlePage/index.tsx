import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const ArticleWithOptimizely = withOptimizelyProvider(ArticlePage);

export default applyBasicPageHandlers(ArticleWithOptimizely);
