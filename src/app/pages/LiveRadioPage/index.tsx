import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import LiveRadioPage from './LiveRadioPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

export default applyBasicPageHandlers(LiveRadioPage, {
  handlerBeforeContexts: withOptimizelyProvider,
});
