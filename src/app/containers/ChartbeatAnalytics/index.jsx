import React, { useContext } from 'react';
import useToggle from '../Toggle/useToggle';
import AmpChartbeatBeacon from './amp';
import CanonicalChartbeatBeacon from './canonical';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import {
  chartbeatUID,
  chartbeatSource,
  useCanonical,
  getSylphidCookie,
  getDomain,
  buildSections,
  getType,
} from '../../lib/analyticsUtils/chartbeat';

const ChartbeatAnalytics = () => {
  const { service } = useContext(ServiceContext);
  const { env, platform, pageType } = useContext(RequestContext);
  const { enabled } = useToggle('chartbeatAnalytics');

  if (!enabled) {
    return null;
  }

  const domain = env !== 'live' ? getDomain('test') : getDomain(service);
  const sections = buildSections(service, pageType);
  const cookie = getSylphidCookie();
  const type = getType(pageType);
  const commonProps = {
    domain,
    type,
    sections,
    cookie,
    chartbeatUID,
  };
  return platform === 'amp' ? (
    <AmpChartbeatBeacon {...commonProps} />
  ) : (
    <CanonicalChartbeatBeacon
      {...commonProps}
      useCanonical={useCanonical}
      chartbeatSource={chartbeatSource}
    />
  );
};

export default ChartbeatAnalytics;
