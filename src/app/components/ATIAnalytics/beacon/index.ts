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
  experimentName,
  experimentVariant,
  useReverb,
  itemTracker,
  groupTracker,
  eventGroupingName,
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
    experimentName,
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
        experimentName,
        experimentVariant,
        itemTracker,
        groupTracker,
        eventGroupingName,
      })
    : null;

  await sendBeacon(atiClickTrackingUrl, reverbParams);
};

export default sendEventBeacon;
