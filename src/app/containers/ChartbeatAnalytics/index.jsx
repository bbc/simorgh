import React, { useContext } from 'react';
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

const ChartbeatAnalyticsBeacon = () => {
  const { service } = useContext(ServiceContext);
  const { env, platform, pageType } = useContext(RequestContext);
  const domain =
    env === 'test' || env === 'local' ? getDomain('test') : getDomain(service);

  const sections = buildSections(service, pageType);
  const cookie = getSylphidCookie();
  const type = getType(pageType);

  const beacon =
    platform === 'amp' ? (
      <AmpChartbeatsBeacon
        domain={domain}
        type={type}
        sections={sections}
        cookie={cookie}
        chartbeatUID={chartbeatUID}
      />
    ) : (
      <CanonicalChartbeatsBeacon
        domain={domain}
        type={type}
        sections={sections}
        cookie={cookie}
        chartbeatUID={chartbeatUID}
        useCanonical={useCanonical}
      />
    );
  return beacon;
};

export default ChartbeatAnalyticsBeacon;
