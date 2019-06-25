import { useContext } from 'react';

import { atiPageViewParams } from './atiUrl';

import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import {
  getContentId,
  getLanguage,
  getPageIdentifier,
  getPageTitle,
} from '../../lib/analyticsUtils/frontpage';

const FrontPageAtiParams = frontpageData => {
  const { platform, statsDestination } = useContext(RequestContext);
  const { atiAnalyticsAppName, brandName, service } = useContext(
    ServiceContext,
  );

  return atiPageViewParams({
    appName: atiAnalyticsAppName,
    contentId: getContentId(frontpageData),
    contentType: 'index-home',
    language: getLanguage(frontpageData),
    pageIdentifier: getPageIdentifier(frontpageData),
    pageTitle: getPageTitle(frontpageData, brandName),
    platform,
    service,
    statsDestination,
  });
};

export default FrontPageAtiParams;
