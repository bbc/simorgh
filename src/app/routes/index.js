import error from './error';
import errorNoRouteMatch from './errorNoRouteMatch';
import homePage from './homePage';
import liveRadio from './liveRadio';
import mostRead from './mostRead';
import onDemandRadio from './onDemandRadio';
import onDemandTV from './onDemandTV';
import podcast from './podcast';
import topic from './topic';

export default [
  homePage,
  liveRadio,
  mostRead,
  podcast,
  onDemandRadio,
  onDemandTV,
  topic,
  error,
  errorNoRouteMatch, // When none of the above routes match, it will fall to this.
  // Please ensure that when adding new pages, it is above this element in the array.
];
