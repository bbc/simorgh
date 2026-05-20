import { use, useEffect, useState } from 'react';
import { reverbUrlHelper } from '@bbc/reverb-url-helper';
import { Helmet } from 'react-helmet';

import { RequestContext } from '#app/contexts/RequestContext';
import useConnectionBackOnlineTracker from '#app/hooks/useConnectionBackOnlineTracker';
import useConnectionTypeTracker from '#app/hooks/useConnectionTypeTracker';
import usePWAInstallTracker from '#app/hooks/usePWAInstallTracker';
import usePWAOfflineTracking from '#app/hooks/usePWAOfflineTracking';
import sendBeacon from '#app/lib/analyticsUtils/sendBeacon';
import sendPageViewBeaconLite from '#app/lib/analyticsUtils/staticATITracking/processClientDeviceAndSendStaticBeacon';
import { addSendStaticBeaconToWindow } from '#app/lib/analyticsUtils/staticATITracking/sendStaticBeacon';
import addInlineScript, {
  type InlineScriptProps,
} from '#app/lib/utilities/addInlineScript';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import type { ATIAnalyticsProps } from '../types';
import getNoScriptTrackingPixelUrl from './getNoScriptTrackingPixelUrl';
import sendPageViewBeaconOperaMini from './sendPageViewBeaconOperaMini';

const renderNoScriptTrackingPixel = ({ reverbParams }: ATIAnalyticsProps) => {
  return (
    <noscript id="analytics-noscript">
      <img
        height="1px"
        width="1px"
        alt=""
        // This should probably have been a styled component. But the author is
        // lazy and didn't want to write a fuzzy matcher for the unit AND e2e
        // tests (you can't predict the class names chosen by emotion)
        style={{ position: 'absolute' }}
        src={getNoScriptTrackingPixelUrl({ reverbParams })}
      />
    </noscript>
  );
};

const addScript = ({ script, parameters, nonce }: InlineScriptProps) => (
  <Helmet>{addInlineScript({ script, parameters, nonce })}</Helmet>
);

const CanonicalATIAnalytics = ({ reverbParams }: ATIAnalyticsProps) => {
  const { isLite, nonce } = use(RequestContext);

  usePWAInstallTracker();

  useConnectionTypeTracker();
  useConnectionBackOnlineTracker();
  usePWAOfflineTracking();

  const [reverbBeaconConfig] = useState(reverbParams);

  useEffect(() => {
    if (!isOperaProxy()) sendBeacon(reverbBeaconConfig);
  }, [reverbBeaconConfig]);

  const liteSiteReverbURL = reverbUrlHelper.getLitePageViewUrl(reverbParams);
  const operaMiniPageViewReverbURL =
    reverbUrlHelper.getOperaMiniPageViewUrl(reverbParams);

  return (
    <>
      {addScript({ script: addSendStaticBeaconToWindow(), nonce })}
      {isLite &&
        addScript({
          script: sendPageViewBeaconLite,
          parameters: [liteSiteReverbURL],
          nonce,
        })}
      {!isLite &&
        addScript({
          script: sendPageViewBeaconOperaMini(operaMiniPageViewReverbURL),
          nonce,
        })}
      {renderNoScriptTrackingPixel({ reverbParams })}
    </>
  );
};

export default CanonicalATIAnalytics;
