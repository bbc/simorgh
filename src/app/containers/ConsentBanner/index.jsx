import React, { useContext, useEffect } from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';
import { EventContext } from '../../contexts/EventContext';
import { buildATIClickParams } from '../ATIAnalytics/params';
import { sendEventBeacon, sendViewBeacon } from '../ATIAnalytics/beacon';
import { ServiceContext } from '../../contexts/ServiceContext';

const ConsentBanner = props => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const eventContext = useContext(EventContext);

  const params = buildATIClickParams(props, requestContext, serviceContext);

  useEffect(() => {
    sendViewBeacon({
      ...params,
      element: document.querySelector('header'),
      component: 'cookie-banner',
    });
  }, []);

  const { useClickTracker } = eventContext;

  useClickTracker('header *', e => {
    sendEventBeacon({
      ...params,
      element: e.target,
      component: 'cookie-banner',
      type: 'click',
      label: 'cookie-accept',
    });
  });

  const { platform } = requestContext;

  return platform === 'amp' ? <Amp /> : <Canonical />;
};

export default ConsentBanner;
