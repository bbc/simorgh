import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { EventContext } from '#contexts/EventContext';
import { ServiceContext } from '#contexts/ServiceContext';
import Canonical from './index.canonical';
import Amp from './index.amp';
import { sendEventBeacon } from '../ATIAnalytics/beacon';
import { buildATIClickParams } from '../ATIAnalytics/params';

const ConsentBanner = () => {
  const { useClickTracker } = useContext(EventContext);
  const { platform } = useContext(RequestContext);
  const params = buildATIClickParams(
    useContext(RequestContext),
    useContext(ServiceContext),
  );

  useClickTracker('[data-cookie-banner]', event => {
    const eventData = event.srcElement.dataset.cookieBanner;

    sendEventBeacon({
      ...params,
      element: event.target,
      componentName: 'consent-banner',
      type: 'click',
      componentInfo: `consent-${eventData}`,
    });
  });

  return platform === 'amp' ? <Amp /> : <Canonical />;
};

export default ConsentBanner;
