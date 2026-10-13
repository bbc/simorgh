import { useEffect, useRef, use } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { Helmet } from 'react-helmet';
import { addSendStaticBeaconToWindow } from '#app/lib/analyticsUtils/staticATITracking/sendStaticBeacon';
import sendPageViewBeaconLite from '#app/lib/analyticsUtils/staticATITracking/processClientDeviceAndSendStaticBeacon';
import sendBeacon from '#app/lib/analyticsUtils/sendBeacon';
import addInlineScript, {
  InlineScriptProps,
} from '#app/lib/utilities/addInlineScript';
import usePWAInstallTracker from '#app/hooks/usePWAInstallTracker';
import { reverbUrlHelper } from '@bbc/reverb-url-helper';
import useConnectionBackOnlineTracker from '#app/hooks/useConnectionBackOnlineTracker';
import useConnectionTypeTracker from '#app/hooks/useConnectionTypeTracker';
import usePWAOfflineTracking from '#app/hooks/usePWAOfflineTracking';
import { ATIAnalyticsProps } from '../types';
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

const addScript = ({ script, parameters, nonce }: InlineScriptProps) => {
  return <Helmet>{addInlineScript({ script, parameters, nonce })}</Helmet>;
};

const CanonicalATIAnalytics = ({
  reverbParams,
  resonanceParams,
}: ATIAnalyticsProps) => {
  const { isLite, nonce } = use(RequestContext);
  const isHydrated = useHydrationDetection();

  usePWAInstallTracker();

  useConnectionTypeTracker();
  useConnectionBackOnlineTracker();
  usePWAOfflineTracking();

  // Cookie-derived values (e.g. hashedUserId) on AccountContext are only populated
  // once isHydrated is true, to keep this component's first client render matching
  // the server-rendered markup. Wait for that render before snapshotting the beacon
  // payload, and use a ref (rather than state) to guarantee it's only ever sent once.
  const hasSentBeacon = useRef(false);

  useEffect(() => {
    if (hasSentBeacon.current || !isHydrated || isOperaProxy()) return;

    hasSentBeacon.current = true;
    sendBeacon(reverbParams, resonanceParams);
  }, [isHydrated, reverbParams, resonanceParams]);

  const liteSiteReverbURL = reverbUrlHelper.getLitePageViewUrl(reverbParams);
  const operaMiniPageViewReverbURL =
    reverbUrlHelper.getOperaMiniPageViewUrl(reverbParams);

  return (
    <>
      {addScript({ script: addSendStaticBeaconToWindow, nonce })}
      {isLite &&
        addScript({
          script: sendPageViewBeaconLite,
          parameters: [liteSiteReverbURL],
          nonce,
        })}
      {!isLite &&
        addScript({
          script: sendPageViewBeaconOperaMini,
          parameters: [operaMiniPageViewReverbURL, isOperaProxy],
          nonce,
        })}
      {renderNoScriptTrackingPixel({ reverbParams })}
    </>
  );
};

export default CanonicalATIAnalytics;
