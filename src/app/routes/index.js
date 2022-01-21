import article from './article';
import cpsAsset from './cpsAsset';
import home from './home';
import liveRadio from './liveRadio';
import mostRead from './mostRead';
import mostWatched from './mostWatched';
import podcast from './podcast';
import onDemandRadio from './onDemandRadio';
import onDemandTV from './onDemandTV';
import topic from './topic';
import idx from './idx';
import error from './error';
import errorNoRouteMatch from './errorNoRouteMatch';

export default [
  article,
  home,
  liveRadio,
  mostRead,
  mostWatched,
  podcast,
  onDemandRadio,
  onDemandTV,
  topic,
  idx,
  cpsAsset,
  error,
  errorNoRouteMatch, // When none of the above routes match, it will fall to this.
  // Please ensure that when adding new pages, it is above this element in the array.
];
