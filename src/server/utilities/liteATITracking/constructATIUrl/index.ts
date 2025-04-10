import { buildATIEventTrackUrl } from '#app/components/ATIAnalytics/atiUrl';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import {
  ATIEventType,
  EventTrackingProps,
} from '#app/lib/analyticsUtils/types';

type ConstructATIUrlProps = {
  props: EventTrackingProps;
  eventType: ATIEventType;
};

export default ({ props, eventType }: ConstructATIUrlProps) => {
  const atiTrackingParams = extractATITrackingProps({ props, eventType });
  return buildATIEventTrackUrl(atiTrackingParams);
};
