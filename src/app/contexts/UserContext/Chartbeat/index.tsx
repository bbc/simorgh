import React, { useContext } from 'react';
import useToggle from '../../../hooks/useToggle';
import CanonicalChartbeatBeacon from '../../../components/ChartbeatAnalytics/canonical';
import { RequestContext } from '../../RequestContext';
import { CanonicalChartbeatConfig } from '../../../components/ChartbeatAnalytics/types';

const Chartbeat = ({
  config = null,
}: {
  config: CanonicalChartbeatConfig | null;
}) => {
  const { enabled } = useToggle('chartbeatAnalytics');
  const { isAmp } = useContext(RequestContext);

  if (!enabled || !config || isAmp) {
    return null;
  }

  return <CanonicalChartbeatBeacon chartbeatConfig={config} />;
};

export default Chartbeat;
