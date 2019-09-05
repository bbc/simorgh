import React, { useContext, useCallback } from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';
import { EventContext } from '../../contexts/EventContext';
import { buildATIParams } from '../ATIAnalytics/params';
import sendBeacon from '../../lib/analyticsUtils/sendBeacon';
import { ServiceContext } from '../../contexts/ServiceContext';

export const ConsentBanner = props => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const eventContext = useContext(EventContext);

  const query = buildATIParams(props, requestContext, serviceContext);
  const atiUrl = process.env.SIMORGH_ATI_BASE_URL + query;

  const { useClickTracker } = eventContext;

  useClickTracker(
    'header *',
    useCallback(e => {
      console.log({ message: 'data-consent-banner', e });

      sendBeacon(atiUrl);
    }, []),
  );

  const { platform } = requestContext;

  return platform === 'amp' ? <Amp /> : <Canonical />;
};

export default ConsentBanner;
