import React, { useContext, useEffect, useRef } from 'react';
import useToggle from '../Toggle/useToggle';
import AmpChartbeatBeacon from './amp';
import CanonicalChartbeatBeacon from './canonical';
import { RequestContext } from '../../contexts/RequestContext';
import getConfig from './ChartbeatConfig';
import { pageDataPropType } from '../../models/propTypes/data';
import { chartbeatSource } from '../../lib/analyticsUtils/chartbeat';

const ChartbeatAnalytics = ({ data }) => {
  const { enabled } = useToggle('chartbeatAnalytics');
  const { platform } = useContext(RequestContext);

  const isLoading = useRef(false);

  useEffect(() => {
    isLoading.current = true;
  });

  if (!enabled || isLoading.current) {
    return null;
  }

  const config = getConfig(data);
  const isAmp = platform === 'amp';

  return isAmp ? (
    <AmpChartbeatBeacon chartbeatConfig={config} />
  ) : (
    <CanonicalChartbeatBeacon
      chartbeatConfig={config}
      chartbeatSource={chartbeatSource}
    />
  );
};

ChartbeatAnalytics.propTypes = {
  data: pageDataPropType.isRequired,
};

export default ChartbeatAnalytics;
