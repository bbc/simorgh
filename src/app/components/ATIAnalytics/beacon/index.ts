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
  isSignedIn,
  hashedId,
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
    isSignedIn,
    hashedId,
  });

  await sendBeacon(reverbParams);
};

export default sendEventBeacon;
