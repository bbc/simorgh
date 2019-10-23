import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { buildATIEventTrackUrl } from '../atiUrl';

export const sendEventBeacon = async ({
  element,
  componentName,
  type,
  componentInfo,
  ...params
}) => {
  const impressionProps = {
    ...params,
    element,
    componentName,
    componentInfo,
  };
  const viewProps = {
    ...impressionProps,
    type,
  };
  await Promise.all([
    sendBeacon(buildATIEventTrackUrl(impressionProps)), // impression event
    sendBeacon(buildATIEventTrackUrl(viewProps)), // actual event
  ]);
};

export const sendViewBeacon = async ({ element, component, ...params }) => {
  const atiViewUrl = buildATIEventTrackUrl({
    ...params,
    element,
    component,
    type: 'viewed',
  });

  await sendBeacon(atiViewUrl);
};

export default sendEventBeacon;
