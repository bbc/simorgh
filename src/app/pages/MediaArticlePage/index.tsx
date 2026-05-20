import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';
import MediaArticlePage from './MediaArticlePage';

export default applyBasicPageHandlers(MediaArticlePage, {
  handlerBeforeContexts: withOptimizelyProvider,
});
