import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import {
  buildATIEventTrackUrl,
  buildReverbPageSectionEventModel,
} from '../atiUrl';
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
    ? buildReverbPageSectionEventModel({
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

  await sendBeacon(atiClickTrackingUrl, reverbParams);
};

export default sendEventBeacon;
