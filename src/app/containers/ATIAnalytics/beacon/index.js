import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { buildATIEventTrackUrl } from '../atiUrl';

export const sendEventBeacon = async ({
  element,
  component,
  type,
  label,
  ...params
}) => {
  const impressionProps = {
    ...params,
    element,
    component,
  };
  const viewProps = {
    ...impressionProps,
    type,
    label,
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
