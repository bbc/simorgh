import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import OfflinePageComponent from './OfflinePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

const EnhancedOfflinePage = applyBasicPageHandlers(OfflinePageComponent, {
  handlerBeforeContexts: withOptimizelyProvider,
});

export const OfflinePage = EnhancedOfflinePage;
export default EnhancedOfflinePage;
