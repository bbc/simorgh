import { useContext } from 'react';
import { RequestContext } from '../../../contexts/RequestContext';
import { ServiceContext } from '../../../contexts/ServiceContext';
import listener from '../../../lib/analyticsUtils/eventListener';

const EventTracker = frontPageData => {
  const { platform, statsDestination } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);

  return listener(frontPageData, platform, statsDestination, service);
};

export default EventTracker;
