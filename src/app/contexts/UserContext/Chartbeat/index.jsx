import React, { useContext } from 'react';
import { shape } from 'prop-types';
import useToggle from '../../../containers/Toggle/useToggle';
import CanonicalChartbeatBeacon from '../../../containers/ChartbeatAnalytics/canonical';
import { RequestContext } from '../../RequestContext';
import { canonicalChartbeatPropTypes } from '../../../models/propTypes/chartbeatAnalytics';

const Chartbeat = ({ config }) => {
  const { enabled } = useToggle('chartbeatAnalytics');
  const { platform } = useContext(RequestContext);
  const isAmp = platform === 'amp';

  if (!enabled || !config || isAmp) {
    return null;
  }

  return <CanonicalChartbeatBeacon chartbeatConfig={config} />;
};

Chartbeat.propTypes = {
  config: shape(canonicalChartbeatPropTypes),
};

Chartbeat.defaultProps = {
  config: null,
};

export default Chartbeat;
