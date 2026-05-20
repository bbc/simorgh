import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';
import HomePage from './HomePage';

export default applyBasicPageHandlers(HomePage, {
  handlerBeforeContexts: withOptimizelyProvider,
});
