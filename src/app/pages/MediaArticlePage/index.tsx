import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import MediaArticlePage from './MediaArticlePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

export default applyBasicPageHandlers(MediaArticlePage, {
  handlerBeforeContexts: withOptimizelyProvider,
});
