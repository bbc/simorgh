import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import MostReadPage from './MostReadPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

export default applyBasicPageHandlers(MostReadPage, {
  handlerBeforeContexts: withOptimizelyProvider,
});
