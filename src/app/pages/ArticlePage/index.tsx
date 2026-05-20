import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';
import ArticlePage from './ArticlePage';

export default applyBasicPageHandlers(ArticlePage, {
  handlerBeforeContexts: withOptimizelyProvider,
});
