import React, { useContext } from 'react';
import useToggle from '#hooks/useToggle';
import CanonicalChartbeatBeacon from '#containers/ChartbeatAnalytics/canonical';
import { canonicalChartbeatPropTypes } from '#app/models/propTypes/chartbeatAnalytics';
import { RequestContext } from '../../RequestContext';

type Props = typeof canonicalChartbeatPropTypes | null;

const Chartbeat = ({ config = null }: { config: Props }) => {
  const { enabled } = useToggle('chartbeatAnalytics');
  const { isAmp } = useContext(RequestContext);

  if (!enabled || !config || isAmp) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <CanonicalChartbeatBeacon chartbeatConfig={config} />;
};

export default Chartbeat;
