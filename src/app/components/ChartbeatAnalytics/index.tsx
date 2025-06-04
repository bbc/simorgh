import React, { useContext } from 'react';
import useToggle from '../../hooks/useToggle';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import AmpChartbeatBeacon from './amp';
import CanonicalChartbeatBeacon from './canonical';
import { GetConfigProps, getConfig } from './utils';
import { ChartbeatProps } from './types';

const ChartbeatAnalytics = ({
  sectionName,
  categoryName,
  mediaPageType,
  title,
  authors,
  taggings,
  contentType,
  producer,
  chapter,
}: ChartbeatProps) => {
  const { service, brandName, chartbeatDomain } = useContext(ServiceContext);
  const { env, isAmp, platform, pageType } = useContext(RequestContext);

  const { enabled } = useToggle('chartbeatAnalytics');

  if (!enabled) return null;

  const configDependencies: GetConfigProps = {
    isAmp,
    platform,
    pageType,
    brandName,
    chartbeatDomain,
    env,
    service,
    sectionName,
    categoryName,
    mediaPageType,
    title,
    authors,
    taggings,
    contentType,
    producer,
    chapter,
  };

  const chartbeatConfig = getConfig(configDependencies);

  if (isAmp) return <AmpChartbeatBeacon chartbeatConfig={chartbeatConfig} />;

  return <CanonicalChartbeatBeacon chartbeatConfig={chartbeatConfig} />;
};

export default ChartbeatAnalytics;
