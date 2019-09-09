import { useContext } from 'react';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { RequestContext } from '../../../contexts/RequestContext';
import { getReferrer } from '../../../lib/analyticsUtils';
import onClient from '../../../lib/utilities/onClient';
import {
  chartbeatUID,
  useCanonical,
  getSylphidCookie,
  getDomain,
  buildSections,
  getType,
  getTitle,
} from '../../../lib/analyticsUtils/chartbeat';

const generateConfig = values => {
  const {
    data,
    service,
    brandName,
    env,
    platform,
    pageType,
    previousPath,
    origin,
  } = values;
  const referrer = getReferrer(platform, origin, previousPath);
  const title = getTitle(pageType, data, brandName);
  const domain = env !== 'live' ? getDomain('test') : getDomain(service);
  const sections = buildSections(service, pageType);
  const cookie = getSylphidCookie();
  const type = getType(pageType);
  const isAmp = platform === 'amp';
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

const ChartbeatConfig = data => {
  const { service, brandName } = useContext(ServiceContext);
  const { env, platform, pageType, previousPath, origin } = useContext(
    RequestContext,
  );
  return generateConfig({
    data,
    service,
    brandName,
    env,
    platform,
    pageType,
    previousPath,
    origin,
  });
};

export default ChartbeatConfig;
