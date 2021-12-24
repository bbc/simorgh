import articleRoutes from './article';
import cpsAssetRoutes from './cpsAsset';
import homeRoutes from './home';
import liveRadio from './liveRadio';
import mostRead from './mostRead';
import mostWatched from './mostWatched';
import podcast from './podcast';
import onDemandRadio from './onDemandRadio';
import onDemandTV from './onDemandTV';
import idx from './idx';
import error from './error';

const routes = [
  cpsAssetRoutes,
  articleRoutes,
  homeRoutes,
  // liveRadio,
  // mostRead,
  // mostWatched,
  // podcast,
  // onDemandRadio,
  // onDemandTV,
  // idx,
  // error,
].flat();

export default routes;
