// import { useContext } from 'react';
import { atiEventTrackParams } from '../../atiUrl';
import sendBeacon from '../../../../lib/analyticsUtils/sendBeacon';

const FrontPageAtiEventTracker = (
  frontpageData,
  platform,
  statsDestination,
  eventInfo,
) => {
  const url = atiEventTrackParams({
    platform,
    statsDestination,
    eventInfo,
  });

  return sendBeacon(`https://logws1363.ati-host.net/?${url}&type=AT`);
};

export default FrontPageAtiEventTracker;
