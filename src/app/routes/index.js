import article from './article';
import cpsAsset from './cpsAsset';
import home from './home';
import liveRadio from './liveRadio';
import mostRead from './mostRead';
import mostWatched from './mostWatched';
import onDemandRadio from './onDemandRadio';
import onDemandTV from './onDemandTV';
import idx from './idx';
import error from './error';
import errorNoRouteMatch from './errorNoRouteMatch';

export default [
  article,
  cpsAsset,
  home,
  liveRadio,
  mostRead,
  mostWatched,
  onDemandRadio,
  onDemandTV,
  idx,
  error,
  errorNoRouteMatch, // When none of the above routes match, it will fall to this.
  // Please ensure that when adding new pages, it is above this element in the array.
];
