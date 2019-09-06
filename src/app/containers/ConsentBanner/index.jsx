import React, { useContext } from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';
import { EventContext } from '../../contexts/EventContext';
import { buildATIClickParams } from '../ATIAnalytics/params';
import sendBeacon from '../../lib/analyticsUtils/sendBeacon';
import { ServiceContext } from '../../contexts/ServiceContext';
import { buildATIEventTrackUrl } from '../ATIAnalytics/atiUrl';

export const ConsentBanner = props => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const eventContext = useContext(EventContext);

  const { useClickTracker } = eventContext;

  useClickTracker('header *', e => {
    const params = buildATIClickParams(props, requestContext, serviceContext);

    const atiUrl = buildATIEventTrackUrl({
      ...params,
      element: e.target,
      component: 'consent-banner',
    });

    console.log({
      message: 'data-consent-banner',
      e,
      params,
      requestContext,
      serviceContext,
      props,
    });

    sendBeacon(atiUrl);
  });

  const { platform } = requestContext;

  return platform === 'amp' ? <Amp /> : <Canonical />;
};

export default ConsentBanner;
