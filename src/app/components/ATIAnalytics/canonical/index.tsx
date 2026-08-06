import { useEffect, useState, use } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
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
import { Resonance, ResonanceMode } from '@bbc/resonance';
import type {
  ResonanceProperties,
  PageviewProperties,
  BaseProperties,
} from '@bbc/resonance';
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

const CanonicalATIAnalytics = ({ reverbParams }: ATIAnalyticsProps) => {
  // add resonanceParams to props if needed, e.g.
  // const CanonicalATIAnalytics = ({ reverbParams, resonanceParams }: ATIAnalyticsProps) => {
  const { isLite, nonce } = use(RequestContext);

  const resonanceParams = {
    resonanceProperties: {
      mode: ResonanceMode.TEST,
    },
    baseProperties: {
      app: {
        name: 'news-mundo',
        version: '0.1',
      },
      destination: 'WS_NEWS_LANGUAGES_TEST',
      hashedUserId: 'veV9rmzQJt0SgWWjYnZTltTO1hXIIpyZVbz0WV-7HAs',
      pageName: 'pagename.page',
      section: 'test-section::test-subsection::test-subsubsection',
      producer: 'BBC_WORLD_NEWS',
      siteId: 12345,
    },
    pageviewProperties: {
      contentId: 'urn:bbc:tipo:topic:c93v2kkze2rt',
      contentType: 'index-home',
      language: 'es',
      destination: 'WS_NEWS_LANGUAGES_TEST',
      producer: 'BBC_WORLD_NEWS',
    },
  } as {
    resonanceProperties: ResonanceProperties;
    pageviewProperties: PageviewProperties;
    baseProperties: BaseProperties;
  };

  usePWAInstallTracker();

  useConnectionTypeTracker();
  useConnectionBackOnlineTracker();
  usePWAOfflineTracking();

  const [reverbBeaconConfig] = useState(reverbParams);

  const [resonanceBeaconConfig] = useState(resonanceParams);

  // add resonanceBeaconConfig to state? copilot says
  // It is likely there to freeze the initial analytics payload so the page-view beacon is sent once per mount, not again on re-renders.
  // so likely yes, e.g.
  //  const [resonanceBeaconConfig] = useState(resonanceParams);

  useEffect(() => {
    if (!isOperaProxy()) sendBeacon(reverbBeaconConfig, resonanceBeaconConfig);
  }, [reverbBeaconConfig, resonanceBeaconConfig]);
  // add resonance to above, e.g.
  //   if (!isOperaProxy()) sendBeacon(reverbBeaconConfig, resonanceBeaconConfig);
  // }, [reverbBeaconConfig, resonanceBeaconConfig]);

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
