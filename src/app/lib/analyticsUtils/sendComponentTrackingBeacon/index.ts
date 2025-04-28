import { buildReverbComponentTrackingModel } from '#app/components/PageViewTracking/params';
import buildATIComponentTrackingURL from '#app/lib/analyticsUtils/buildATIComponentTrackingURL';
import sendBeacon from '../sendBeacon';
import { ComponentTrackingProps } from '../types';

export default async ({
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
}: ComponentTrackingProps) => {
  const atiComponentTrackingUrl = buildATIComponentTrackingURL({
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
    ? buildReverbComponentTrackingModel({
        pageIdentifier,
        producerName,
        statsDestination,
        componentName,
        campaignID,
        format,
        type,
        advertiserID,
        url,
      })
    : null;

  await sendBeacon(atiComponentTrackingUrl, reverbParams);
};
