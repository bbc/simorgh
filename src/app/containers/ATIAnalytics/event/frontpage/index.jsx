import { useContext, useState, useEffect } from 'react';
import { atiEventTrackParams } from '../../atiUrl';
import { RequestContext } from '../../../../contexts/RequestContext';
import listener from '../../../../lib/analyticsUtils/eventListener';
import sendBeacon from '../../../../lib/analyticsUtils/sendBeacon';

const FrontPageAtiEventTracker = () => {
  const { platform, statsDestination } = useContext(RequestContext);
  const eventInfo = listener();

  const url = atiEventTrackParams({
    platform,
    statsDestination,
    eventInfo,
  });

  const [atiPageViewUrl] = useState(process.env.SIMORGH_ATI_BASE_URL + url);

  return useEffect(() => {
    sendBeacon(atiPageViewUrl);
  }, [atiPageViewUrl]);
};

export default FrontPageAtiEventTracker;
