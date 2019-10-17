import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { EventContext } from '#contexts/EventContext';
import { ServiceContext } from '#contexts/ServiceContext';
import Canonical from './index.canonical';
import Amp from './index.amp';
import { sendEventBeacon } from '../ATIAnalytics/beacon';

const ConsentBanner = () => {
  const { useClickTracker } = useContext(EventContext);
  const { platform } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);

  useClickTracker('[data-cookie-banner]', event => {
    const eventData = event.srcElement.dataset.cookieBanner;

    sendEventBeacon({
      service,
      element: event.target,
      component: 'cookie-banner',
      type: 'click',
      label: `cookie-${eventData}`,
    });
  });

  return platform === 'amp' ? <Amp /> : <Canonical />;
};

export default ConsentBanner;
