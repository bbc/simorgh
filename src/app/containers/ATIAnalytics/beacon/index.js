import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { buildATIEventTrackUrl } from '../atiUrl';

export const sendEventBeacon = async ({
  componentName,
  type,
  componentInfo,
  ...params
}) => {
  const eventProps = {
    ...params,
    componentName,
    componentInfo,
    type,
  };

  await sendBeacon(buildATIEventTrackUrl(eventProps)); // event, e.g. click
};

export default sendEventBeacon;
