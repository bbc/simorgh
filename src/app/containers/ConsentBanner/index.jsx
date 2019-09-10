import React, { useContext, useEffect } from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';
import { EventContext } from '../../contexts/EventContext';
import { buildATIClickParams } from '../ATIAnalytics/params';
import { sendEventBeacon } from '../ATIAnalytics/beacon';
import { ServiceContext } from '../../contexts/ServiceContext';

const ConsentBanner = props => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const eventContext = useContext(EventContext);

  const params = buildATIClickParams(props, requestContext, serviceContext);

  useEffect(() => {
    sendEventBeacon({
      ...params,
      element: document.querySelector('header'),
      component: 'cookie-banner',
      type: 'viewed',
    }); // viewed event
  });

  const { useClickTracker } = eventContext;

  useClickTracker('header *', e => {
    console.log({
      message: 'data-consent-banner',
      e,
      params,
      requestContext,
      serviceContext,
      props,
    });

    sendEventBeacon({
      ...params,
      element: e.target,
      component: 'cookie-banner',
    }); // impression event

    sendEventBeacon({
      ...params,
      element: e.target,
      component: 'cookie-banner',
      type: 'click',
      label: 'cookie-accept',
    }); // click event
  });

  const { platform } = requestContext;

  return platform === 'amp' ? <Amp /> : <Canonical />;
};

export default ConsentBanner;
