import article from './article';
import cpsAsset from './cpsAsset';
import home from './home';
import liveRadio from './liveRadio';
import mostRead from './mostRead';
import onDemandRadio from './onDemandRadio';
import onDemandTV from './onDemandTV';
import error from './error';
import errorNoRouteMatch from './errorNoRouteMatch';
import idx from './idx';

export default [
  article,
  cpsAsset,
  home,
  liveRadio,
  mostRead,
  onDemandRadio,
  onDemandTV,
  idx,
  error,
  errorNoRouteMatch, // When none of the above routes match, it will fall to this.
  // Please ensure that when adding new pages, it is above this element in the array.
];
