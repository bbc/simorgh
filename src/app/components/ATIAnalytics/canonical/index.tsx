import { useEffect, useState, use } from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { Helmet } from 'react-helmet';
import { enforceLegacyDestinationForJapanese } from '#app/lib/analyticsUtils';
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
import { ATIAnalyticsProps } from '../types';
import getNoScriptTrackingPixelUrl from './getNoScriptTrackingPixelUrl';
import sendPageViewBeaconOperaMini from './sendPageViewBeaconOperaMini';

type ATIAnalyticsPropsExport = Pick<ATIAnalyticsProps, 'reverbParams'>;

const renderNoScriptTrackingPixel = (
  reverbParams: ATIAnalyticsPropsExport['reverbParams'],
) => {
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
        src={enforceLegacyDestinationForJapanese(
          getNoScriptTrackingPixelUrl(reverbParams),
        )}
      />
    </noscript>
  );
};

const addScript = ({ script, parameters, nonce }: InlineScriptProps) => {
  return <Helmet>{addInlineScript({ script, parameters, nonce })}</Helmet>;
};

const CanonicalATIAnalytics = ({
  pageviewParams,
  reverbParams,
}: ATIAnalyticsProps) => {
  const { isLite, nonce } = use(RequestContext);

  usePWAInstallTracker();

  useConnectionTypeTracker();
  useConnectionBackOnlineTracker();

  const atiPageViewUrlString =
    getEnvConfig().SIMORGH_ATI_BASE_URL + pageviewParams;

  const [reverbBeaconConfig] = useState(reverbParams);

  const [atiPageViewUrl] = useState(atiPageViewUrlString);

  useEffect(() => {
    if (!isOperaProxy()) sendBeacon(atiPageViewUrl, reverbBeaconConfig);
  }, [atiPageViewUrl, reverbBeaconConfig]);

  const liteSiteReverbURL = enforceLegacyDestinationForJapanese(
    reverbUrlHelper.getLitePageViewUrl(reverbParams),
  );
  const operaMiniPageViewReverbURL = enforceLegacyDestinationForJapanese(
    reverbUrlHelper.getOperaMiniPageViewUrl(reverbParams),
  );

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
      {renderNoScriptTrackingPixel(reverbParams)}
    </>
  );
};

export default CanonicalATIAnalytics;
