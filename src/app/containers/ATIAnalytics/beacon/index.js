import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { buildATIEventTrackUrl } from '../atiUrl';

export const sendEventBeacon = async ({
  element,
  component,
  type,
  label,
  ...params
}) => {
  const preAtiEventUrl = buildATIEventTrackUrl({
    ...params,
    element,
    component,
  });
  const atiEventUrl = buildATIEventTrackUrl({
    ...params,
    element,
    component,
    type,
    label,
  });

  await Promise.all([sendBeacon(preAtiEventUrl), sendBeacon(atiEventUrl)]);
};

export default sendEventBeacon;
