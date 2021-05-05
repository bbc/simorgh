import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { buildATIEventTrackUrl } from '../atiUrl';

export const sendEventBeacon = async ({
  campaignName,
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
      campaignName,
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

  return Promise.resolve();
};

export default sendEventBeacon;
