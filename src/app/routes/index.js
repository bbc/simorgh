import article from './article/index.jsx';
import cpsAsset from './cpsAsset/index.jsx';
import frontPage from './frontPage/index.js';
import homePage from './homePage/index.js';
import liveRadio from './liveRadio/index.js';
import mostRead from './mostRead/index.js';
import mostWatched from './mostWatched/index.js';
import podcast from './podcast/index.js';
import onDemandRadio from './onDemandRadio/index.js';
import onDemandTV from './onDemandTV/index.js';
import topic from './topic/index.js';
import idx from './idx/index.js';
import error from './error/index.js';
import errorNoRouteMatch from './errorNoRouteMatch/index.js';

export default [
  article,
  frontPage,
  homePage,
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
