import React, { useContext } from 'react';
import useToggle from '#hooks/useToggle';
import CanonicalChartbeatBeacon from '#containers/ChartbeatAnalytics/canonical';
import { canonicalChartbeatPropTypes } from '#models/propTypes/chartbeatAnalytics';
import { RequestContext } from '../../RequestContext';

const Chartbeat = ({ config }) => {
  const { enabled } = useToggle('chartbeatAnalytics');
  const { isAmp } = useContext(RequestContext);

  if (!enabled || !config || isAmp) {
    return null;
  }

  return <CanonicalChartbeatBeacon chartbeatConfig={config} />;
};

Chartbeat.propTypes = {
  config: canonicalChartbeatPropTypes,
};

Chartbeat.defaultProps = {
  config: null,
};

export default Chartbeat;
