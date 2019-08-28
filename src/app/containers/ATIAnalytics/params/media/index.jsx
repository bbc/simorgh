import { useContext } from 'react';
import path from 'ramda/src/path';

import atiPageViewParams from '../../atiUrl';
import { RequestContext } from '../../../../contexts/RequestContext';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const Params = pageData => {
  const { platform, statsDestination } = useContext(RequestContext);
  const { atiAnalyticsAppName, atiAnalyticsProducerId, service } = useContext(
    ServiceContext,
  );

  const { metadata } = pageData;

  return atiPageViewParams({
    appName: atiAnalyticsAppName,
    contentId: metadata.id,
    contentType: 'player-live',
    language: metadata.language,
    pageIdentifier: path(['analyticsLabels', 'pageIdentifier'], metadata),
    pageTitle: path(['analyticsLabels', 'pageTitle'], metadata),
    producerId: atiAnalyticsProducerId,
    statsDestination,
    platform,
    service,
  });
};

export default Params;
