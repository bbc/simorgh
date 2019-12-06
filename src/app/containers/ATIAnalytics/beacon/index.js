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

  const viewProps = {
    ...eventProps,
    type: 'view',
  };
  await Promise.all([
    sendBeacon(buildATIEventTrackUrl(eventProps)), // event, e.g. click
    sendBeacon(buildATIEventTrackUrl(viewProps)), // background event
  ]);
};

export default sendEventBeacon;
