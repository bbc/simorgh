import React, { useContext, useEffect } from 'react';
import useToggle from '../../hooks/useToggle';
import { UserContext } from '../../contexts/UserContext';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import AmpChartbeatBeacon from './amp';
import { GetConfigProps, getConfig } from './utils';
import { ChartbeatProps } from './types';

const ChartbeatAnalytics = ({
  sectionName,
  categoryName,
  mediaPageType,
  title,
  taggings,
  contentType,
  producer,
  chapter,
}: ChartbeatProps) => {
  const { service, brandName, chartbeatDomain } = useContext(ServiceContext);
  const { sendCanonicalChartbeatBeacon } = useContext(UserContext);
  const { enabled } = useToggle('chartbeatAnalytics');
  const { env, isAmp, isLow, platform, pageType, previousPath, origin } =
    useContext(RequestContext);
  const isAmpAndEnabled = (isAmp || isLow) && enabled;
  const isCanonicalAndEnabled = !isAmp && !isLow && enabled;

  const configDependencies: GetConfigProps = {
    isAmp,
    platform,
    pageType,
    brandName,
    chartbeatDomain,
    env,
    service,
    origin,
    previousPath,
    sectionName,
    categoryName,
    mediaPageType,
    title,
    taggings,
    contentType,
    producer,
    chapter,
  };

  const chartbeatConfig = getConfig(configDependencies);

  useEffect(() => {
    if (isCanonicalAndEnabled) {
      // @ts-expect-error ignoring: Argument of type of chartbeatConfig is not assignable to parameter of type SetStateAction<null> -> provides no match for the signature '(prevState: null): null'.
      sendCanonicalChartbeatBeacon(chartbeatConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sectionName,
    categoryName,
    mediaPageType,
    title,
    taggings,
    contentType,
    isCanonicalAndEnabled,
  ]);

  return isAmpAndEnabled ? (
    <AmpChartbeatBeacon chartbeatConfig={chartbeatConfig} />
  ) : null;
};

export default ChartbeatAnalytics;
