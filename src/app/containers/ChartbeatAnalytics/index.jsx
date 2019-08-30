/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import useToggle from '../Toggle/useToggle';
import AmpChartbeatBeacon from './amp';
import CanonicalChartbeatBeacon from './canonical';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import { pageDataPropType } from '../../models/propTypes/data';
import { getReferrer } from '../../lib/analyticsUtils';
import onClient from '../../lib/utilities/onClient';
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

const generateConfigData = (
  data,
  pageType,
  isAmp,
  previousPath,
  origin,
  env,
  service,
  brandName,
  platform,
) => {
  const referrer = getReferrer(platform, origin, previousPath);
  const title = getTitle(pageType, data, brandName);
  const domain = env !== 'live' ? getDomain('test') : getDomain(service);
  const sections = buildSections(service, pageType);
  const cookie = getSylphidCookie();
  const type = getType(pageType);
  const currentPath = onClient() && window.location.pathname;
  return {
    domain,
    sections,
    uid: chartbeatUID,
    title,
    virtualReferrer: referrer,
    ...(isAmp && { contentType: type }),
    ...(!isAmp && { type, useCanonical, path: currentPath }),
    ...(cookie && { idSync: { bbc_hid: cookie } }),
  };
};

const ChartbeatAnalytics = ({ data }) => {
  const { env, platform, pageType, previousPath, origin } = useContext(
    RequestContext,
  );
  const { service, brandName } = useContext(ServiceContext);
  // const { enabled } = useToggle('chartbeatAnalytics');

  // if (!enabled) {
  //   return null;
  // }
  const isAmp = platform === 'amp';

  const [config, setConfig] = useState(
    generateConfigData(
      data,
      pageType,
      isAmp,
      previousPath,
      origin,
      env,
      service,
      brandName,
      platform,
    ),
  );

  useEffect(() => {
    setConfig(
      generateConfigData(
        data,
        pageType,
        isAmp,
        previousPath,
        origin,
        env,
        service,
        brandName,
        platform,
      ),
    );
  }, [
    brandName,
    data,
    env,
    isAmp,
    origin,
    pageType,
    platform,
    previousPath,
    service,
  ]);

  return isAmp ? (
    <AmpChartbeatBeacon chartbeatConfig={config} />
  ) : (
    <CanonicalChartbeatBeacon
      chartbeatConfig={config}
      chartbeatSource={chartbeatSource}
    />
  );
};

ChartbeatAnalytics.propTypes = {
  data: pageDataPropType.isRequired,
};

export default ChartbeatAnalytics;
