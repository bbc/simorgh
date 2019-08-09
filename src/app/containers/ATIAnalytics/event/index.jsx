import { useContext } from 'react';
import { RequestContext } from '../../../contexts/RequestContext';
import listener from '../../../lib/analyticsUtils/eventListener';

const EventTracker = frontPageData => {
  const { platform, statsDestination } = useContext(RequestContext);

  return listener(frontPageData, platform, statsDestination);
};

export default EventTracker;
