import React, { useContext, useEffect, useMemo } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import { UserContext } from '../../contexts/UserContext';
import { RequestContext } from '../../contexts/RequestContext';
import { pageDataPropType } from '../../models/propTypes/data';
import AmpChartbeatBeacon from './amp';
import { getConfig } from './utils';
import useToggle from '../Toggle/useToggle';

const ChartbeatAnalytics = ({ data }) => {
  const { service, brandName } = useContext(ServiceContext);
  const { sendCanonicalChartbeatBeacon } = useContext(UserContext);
  const { enabled } = useToggle('chartbeatAnalytics');
  const { env, platform, pageType, previousPath, origin } = useContext(
    RequestContext,
  );
  const isAmpAndEnabled = platform === 'amp' && enabled;
  const isCanonicalAndEnabled = platform === 'canonical' && enabled;

  const chartbeatConfig = useMemo(() => {
    return getConfig({
      platform,
      pageType,
      data,
      brandName,
      env,
      service,
      origin,
      previousPath,
    });
  }, [platform, pageType, data, brandName, env, service, origin, previousPath]);

  useEffect(() => {
    if (isCanonicalAndEnabled) {
      sendCanonicalChartbeatBeacon(chartbeatConfig);
    }
  }, [chartbeatConfig, sendCanonicalChartbeatBeacon, isCanonicalAndEnabled]);

  return (
    isAmpAndEnabled && <AmpChartbeatBeacon chartbeatConfig={chartbeatConfig} />
  );
};

ChartbeatAnalytics.propTypes = {
  data: pageDataPropType.isRequired,
};

export default ChartbeatAnalytics;
