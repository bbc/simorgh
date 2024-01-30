import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { buildATIEventTrackUrl } from '../atiUrl';
import { ATIEventTrackingProps } from '../types';

export const sendEventBeacon = async ({
  campaignID,
  componentName,
  format,
  pageIdentifier,
  platform,
  producerId,
  service,
  statsDestination,
  type,
  advertiserID,
  url,
  detailedPlacement,
}: ATIEventTrackingProps) => {
  await sendBeacon(
    buildATIEventTrackUrl({
      campaignID,
      componentName,
      format,
      pageIdentifier,
      platform,
      producerId,
      service,
      statsDestination,
      type,
      advertiserID,
      url,
      detailedPlacement,
    }),
  );
};

export default sendEventBeacon;
