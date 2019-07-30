import React, { useContext } from 'react';
import { oneOfType } from 'prop-types';
import useToggle from '../Toggle/useToggle';
import AmpChartbeatBeacon from './amp';
import CanonicalChartbeatBeacon from './canonical';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import { articleDataPropTypes } from '../../models/propTypes/article';
import { frontPageDataPropTypes } from '../../models/propTypes/frontPage';
import {
  chartbeatUID,
  chartbeatSource,
  useCanonical,
  getSylphidCookie,
  getDomain,
  buildSections,
  getType,
  getTitle,
} from '../../lib/analyticsUtils/chartbeat';

import { getReferrer } from '../../lib/analyticsUtils';

const ChartbeatAnalytics = ({ data }) => {
  const { service, brandName } = useContext(ServiceContext);
  const { env, platform, pageType, previousPath, origin } = useContext(
    RequestContext,
  );
  const { enabled } = useToggle('chartbeatAnalytics');

  if (!enabled) {
    return null;
  }
  const referrer = getReferrer(platform, origin, previousPath);
  const title = getTitle(pageType, data, brandName);
  const domain = env !== 'live' ? getDomain('test') : getDomain(service);
  const sections = buildSections(service, pageType);
  const cookie = getSylphidCookie();
  const type = getType(pageType);
  const hasCookie = !!cookie;
  const hasReferrer = !!referrer;
  const commonProps = {
    domain,
    type,
    sections,
    cookie,
    chartbeatUID,
    title,
    hasCookie,
    referrer,
    hasReferrer,
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

ChartbeatAnalytics.propTypes = {
  data: oneOfType([articleDataPropTypes, frontPageDataPropTypes]).isRequired,
};

export default ChartbeatAnalytics;
