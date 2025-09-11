import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import HomePage from './HomePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

export default applyBasicPageHandlers(HomePage, {
  handlerBeforeContexts: withOptimizelyProvider,
});
