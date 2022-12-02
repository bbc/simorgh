import React, { useContext, useEffect } from 'react';
import useToggle from '#hooks/useToggle';
import { UserContext } from '#contexts/UserContext';
import { RequestContext } from '#contexts/RequestContext';
import { pageDataPropType } from '#models/propTypes/data';
import { ServiceContext } from '../../../contexts/ServiceContext';
import AmpChartbeatBeacon from './amp';
import { getConfig } from './utils';

const ChartbeatAnalytics = ({ data }) => {
  const {
    service,
    brandName,
    chartbeatDomain,
    mostRead: { header: mostReadTitle },
    mostWatched: { header: mostWatchedTitle },
  } = useContext(ServiceContext);
  const { sendCanonicalChartbeatBeacon } = useContext(UserContext);
  const { enabled } = useToggle('chartbeatAnalytics');
  const { env, isAmp, platform, pageType, previousPath, origin } =
    useContext(RequestContext);
  const isAmpAndEnabled = isAmp && enabled;
  const isCanonicalAndEnabled = !isAmp && enabled;

  const configDependencies = {
    isAmp,
    platform,
    pageType,
    data,
    brandName,
    chartbeatDomain,
    env,
    service,
    origin,
    previousPath,
    mostReadTitle,
    mostWatchedTitle,
  };

  const chartbeatConfig = getConfig(configDependencies);

  useEffect(() => {
    if (isCanonicalAndEnabled) {
      sendCanonicalChartbeatBeacon(chartbeatConfig);
    }
  }, [data, isCanonicalAndEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    isAmpAndEnabled && <AmpChartbeatBeacon chartbeatConfig={chartbeatConfig} />
  );
};

ChartbeatAnalytics.propTypes = {
  data: pageDataPropType.isRequired,
};

export default ChartbeatAnalytics;
