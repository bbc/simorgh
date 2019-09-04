import React, { useContext, useCallback } from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';
import { EventContext } from '../../contexts/EventContext';
import { buildATIParams } from '../ATIAnalytics/params';
import sendBeacon from '../../lib/analyticsUtils/sendBeacon';

const ConsentBanner = props => {
  const { pageType, platform } = useContext(RequestContext);

  const { useClickTracker } = useContext(EventContext);

  const query = buildATIParams({ pageType, data: props });
  const atiUrl = process.env.SIMORGH_ATI_BASE_URL + query;

  useClickTracker(
    '[data-consent-banner] *',
    useCallback(e => {
      console.log({ message: 'data-consent-banner', e });

      sendBeacon(atiUrl);
    }, []),
  );

  return (
    <div data-consent-banner>
      {platform === 'amp' ? <Amp /> : <Canonical />}
    </div>
  );
};

export default ConsentBanner;
