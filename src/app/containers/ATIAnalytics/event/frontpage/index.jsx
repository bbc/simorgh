import { atiEventTrackParams } from '../../atiUrl';
import sendBeacon from '../../../../lib/analyticsUtils/sendBeacon';
import { getPageIdentifier } from '../../../../lib/analyticsUtils/frontpage';

const FrontPageAtiEventTracker = (
  frontpageData,
  platform,
  statsDestination,
  service,
  eventInfo,
) => {
  const url = atiEventTrackParams({
    pageIdentifier: getPageIdentifier(frontpageData),
    service,
    platform,
    statsDestination,
    eventInfo,
  });

  // 'type=AT' means it's an event apparently,
  // not that you would now this from any documentation
  return sendBeacon(`${process.env.SIMORGH_ATI_BASE_URL}${url}&type=AT`);
};

export default FrontPageAtiEventTracker;
