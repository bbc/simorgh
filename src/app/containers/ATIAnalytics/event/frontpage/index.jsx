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

  return sendBeacon(`https://logws1363.ati-host.net/?${url}&type=AT`);
};

export default FrontPageAtiEventTracker;
