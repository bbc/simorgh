import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import ArticlePage from './ArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

export default applyBasicPageHandlers(ArticlePage, {
  handlerBeforeContexts: withOptimizelyProvider,
});
