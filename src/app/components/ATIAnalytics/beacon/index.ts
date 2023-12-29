import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { buildATIEventTrackUrl, buildReverbClickEventModel } from '../atiUrl';
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
  useReverb,
}: ATIEventTrackingProps) => {
  const atiClickTrackingUrl = buildATIEventTrackUrl({
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
  });

  const reverbParams = useReverb ? buildReverbClickEventModel() : null;

  await sendBeacon(atiClickTrackingUrl, reverbParams);
};

export default sendEventBeacon;
