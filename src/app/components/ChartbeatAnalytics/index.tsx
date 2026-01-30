import { use } from 'react';
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
  const { service, brandName, chartbeatDomain } = use(ServiceContext);
  const { env, isAmp, platform, pageType, nonce } = use(RequestContext);

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

  return (
    <CanonicalChartbeatBeacon chartbeatConfig={chartbeatConfig} nonce={nonce} />
  );
};

export default ChartbeatAnalytics;
