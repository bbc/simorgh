import React, { useContext } from 'react';
import useToggle from '../Toggle/useToggle';
import AmpChartbeatBeacon from './amp';
import CanonicalChartbeatBeacon from './canonical';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import { pageDataPropType } from '../../models/propTypes/data';
import { getReferrer } from '../../lib/analyticsUtils';
import {
  chartbeatUID,
  chartbeatSource,
  useCanonical,
  getSylphidCookie,
  getDomain,
  buildSections,
  getType,
  getTitle,
  getAuthors,
} from '../../lib/analyticsUtils/chartbeat';

const ChartbeatAnalytics = ({ data }) => {
  const { service, brandName, articleAuthor, currentPath } = useContext(
    ServiceContext,
  );
  const { enabled } = useToggle('chartbeatAnalytics');
  const { env, platform, pageType, previousPath, origin } = useContext(
    RequestContext,
  );

  if (!enabled) {
    return null;
  }

  const referrer = getReferrer(platform, origin, previousPath);
  const title = getTitle(pageType, data, brandName);
  const domain = env !== 'live' ? getDomain('test') : getDomain(service);
  const sections = buildSections(service, pageType);
  const cookie = getSylphidCookie();
  const type = getType(pageType);
  const isAmp = platform === 'amp';
  const authors = getAuthors(pageType, articleAuthor);
  const config = {
    domain,
    sections,
    uid: chartbeatUID,
    title,
    authors,
    ...(isAmp && { contentType: type }),
    ...(!isAmp && { type, useCanonical, path: currentPath }),
    ...(referrer && { virtualReferrer: referrer }),
    ...(cookie && { idSync: { bbc_hid: cookie } }),
  };

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
