import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { buildATIEventTrackUrl } from '../atiUrl';

export const sendEventBeacon = async ({
  campaignID,
  componentName,
  format,
  pageIdentifier,
  platform,
  service,
  statsDestination,
  type,
  url,
}) => {
  await sendBeacon(
    buildATIEventTrackUrl({
      campaignID,
      componentName,
      format,
      pageIdentifier,
      platform,
      service,
      statsDestination,
      type,
      url,
    }),
  );
};

export default sendEventBeacon;
