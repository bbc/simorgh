import { buildATIEventTrackUrl } from '#app/components/ATIAnalytics/atiUrl';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { EventTrackingProps } from '#app/lib/analyticsUtils/types';

export default ({
  eventTrackingData,
  eventType,
  isStatic = false,
}: EventTrackingProps & {
  isStatic?: boolean;
}) => {
  const atiTrackingParams = extractATITrackingProps({
    eventTrackingData,
    eventType,
  });
  return buildATIEventTrackUrl({ ...atiTrackingParams, isStatic });
};
