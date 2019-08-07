import { useContext } from 'react';
import atiPageViewParams from '../../atiUrl';
import { RequestContext } from '../../../../contexts/RequestContext';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const Params = pageData => {
  const { platform, statsDestination } = useContext(RequestContext);
  const { atiAnalyticsAppName, service } = useContext(ServiceContext);

  const { metadata } = pageData;

  return atiPageViewParams({
    appName: atiAnalyticsAppName,
    contentId: metadata.id,
    contentType: 'player-live',
    language: metadata.language,
    pageIdentifier: metadata.analyticsLabels.pageIdentifier,
    pageTitle: metadata.analyticsLabels.pageTitle,
    statsDestination,
    platform,
    service,
  });
};

export default Params;
