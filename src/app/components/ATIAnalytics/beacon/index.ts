import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { buildReverbEventModel } from '../atiUrl';
import { ATIEventTrackingProps } from '../types';

export const sendEventBeacon = async ({
  campaignID,
  componentName,
  format,
  pageIdentifier,
  producerName,
  statsDestination,
  type,
  advertiserID,
  url,
  experimentName,
  experimentVariant,
  itemTracker,
  groupTracker,
  eventGroupingName,
}: ATIEventTrackingProps) => {
  const reverbParams = buildReverbEventModel({
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
  });

  await sendBeacon(reverbParams);
};

export default sendEventBeacon;
