import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { EventTrackingProps } from '#app/lib/analyticsUtils/types';
import buildATIComponentTrackingURL from '#app/lib/analyticsUtils/buildATIComponentTrackingURL';

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
  return buildATIComponentTrackingURL({ ...atiTrackingParams, isStatic });
};
