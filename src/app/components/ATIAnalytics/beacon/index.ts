import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { buildATIEventTrackUrl, buildReverbEventModel } from '../atiUrl';
import { ATIEventTrackingProps } from '../types';

export const sendEventBeacon = async ({
  campaignID,
  componentName,
  format,
  pageIdentifier,
  platform,
  producerId,
  producerName,
  service,
  statsDestination,
  type,
  advertiserID,
  url,
  detailedPlacement,
  experimentVariant,
  useReverb,
  componentSpecificTrackers,
  blockSpecificTrackers,
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
    detailedPlacement,
    experimentVariant,
  });

  const reverbParams = useReverb
    ? buildReverbEventModel({
        pageIdentifier,
        producerName,
        statsDestination,
        componentName,
        campaignID,
        format,
        type,
        advertiserID,
        url,
        experimentVariant,
        componentSpecificTrackers,
        blockSpecificTrackers,
      })
    : null;

  await sendBeacon(atiClickTrackingUrl, reverbParams);
};

export default sendEventBeacon;
