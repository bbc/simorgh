import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { buildATIEventTrackUrl } from '../atiUrl';

export const sendEventBeacon = async ({
  element,
  component,
  type,
  label,
  ...params
}) => {
  const atiEventUrl = buildATIEventTrackUrl({
    ...params,
    element,
    component,
    type,
    label,
  });

  await sendBeacon(atiEventUrl);
};

export default sendEventBeacon;
