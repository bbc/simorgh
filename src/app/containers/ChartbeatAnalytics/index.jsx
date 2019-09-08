import { useContext, useEffect } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import { UserContext } from '../../contexts/UserContext';
import { RequestContext } from '../../contexts/RequestContext';
import { pageDataPropType } from '../../models/propTypes/data';
import { getReferrer } from '../../lib/analyticsUtils';
import onClient from '../../lib/utilities/onClient';
import {
  chartbeatUID,
  useCanonical,
  getSylphidCookie,
  getDomain,
  buildSections,
  getType,
  getTitle,
} from './utils';

const ChartbeatAnalytics = ({ data }) => {
  const { service, brandName } = useContext(ServiceContext);
  const { useChartbeat } = useContext(UserContext);
  const { env, platform, pageType, previousPath, origin } = useContext(
    RequestContext,
  );

  useEffect(() => {
    const referrer = getReferrer(platform, origin, previousPath);
    const title = getTitle(pageType, data, brandName);
    const domain = env !== 'live' ? getDomain('test') : getDomain(service);
    const sections = buildSections(service, pageType);
    const cookie = getSylphidCookie();
    const type = getType(pageType);
    const isAmp = platform === 'amp';
    const currentPath = onClient() && window.location.pathname;
    const config = {
      domain,
      sections,
      uid: chartbeatUID,
      title,
      virtualReferrer: referrer,
      ...(isAmp && { contentType: type }),
      ...(!isAmp && { type, useCanonical, path: currentPath }),
      ...(cookie && { idSync: { bbc_hid: cookie } }),
    };

    useChartbeat(config);
  }, [
    brandName,
    data,
    env,
    origin,
    pageType,
    platform,
    previousPath,
    service,
    useChartbeat,
  ]);

  return null;
};

ChartbeatAnalytics.propTypes = {
  data: pageDataPropType.isRequired,
};

export default ChartbeatAnalytics;
