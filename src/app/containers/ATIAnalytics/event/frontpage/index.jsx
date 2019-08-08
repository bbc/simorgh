// import { useContext } from 'react';
import { atiEventTrackParams } from '../../atiUrl';
// import { RequestContext } from '../../../../contexts/RequestContext';
// import listener from '../../../../lib/analyticsUtils/eventListener';
import sendBeacon from '../../../../lib/analyticsUtils/sendBeacon';

const FrontPageAtiEventTracker = eventInfo => {
  // const { platform, statsDestination } = useContext(RequestContext);
  // const eventInfo = listener();

  const url = atiEventTrackParams({
    platform: 'platform',
    statsDestination: 'statsDestination',
    eventInfo,
  });
  console.log(eventInfo);
  return sendBeacon(`https://logws1363.ati-host.net/?${url}&type=AT`);
};

export default FrontPageAtiEventTracker;
