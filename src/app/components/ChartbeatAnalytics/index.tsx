import React, { useContext, useEffect } from 'react';
import useToggle from '../../hooks/useToggle';
import { UserContext } from '../../contexts/UserContext';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import AmpChartbeatBeacon from './amp';
import { GetConfigProps, getConfig } from './utils';
import { ChartbeatProps } from './types';

const ChartbeatAnalytics = ({ data, sectionName }: ChartbeatProps) => {
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

  const configDependencies: GetConfigProps = {
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
    sectionName,
  };

  const chartbeatConfig = getConfig(configDependencies);

  useEffect(() => {
    if (isCanonicalAndEnabled) {
      // @ts-expect-error ignoring: Argument of type of chartbeatConfig is not assignable to parameter of type SetStateAction<null> -> provides no match for the signature '(prevState: null): null'.
      sendCanonicalChartbeatBeacon(chartbeatConfig);
    }
  }, [data, isCanonicalAndEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return isAmpAndEnabled ? (
    <AmpChartbeatBeacon chartbeatConfig={chartbeatConfig} />
  ) : null;
};

export default ChartbeatAnalytics;
