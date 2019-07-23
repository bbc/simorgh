import React, { useContext } from 'react';
import useToggle from '../Toggle/useToggle';
import AmpChartbeatsBeacon from './amp';
import CanonicalChartbeatsBeacon from './canonical';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import {
  chartbeatUID,
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
  const domain =
    env === 'test' || env === 'local' ? getDomain('test') : getDomain(service);

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

  if (enabled) {
    return platform === 'amp' ? (
      <AmpChartbeatsBeacon {...commonProps} />
    ) : (
      <CanonicalChartbeatsBeacon {...commonProps} useCanonical={useCanonical} />
    );
  }
  return null;
};

export default ChartbeatAnalytics;
