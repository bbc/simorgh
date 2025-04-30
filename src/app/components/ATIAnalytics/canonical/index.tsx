import React, { useContext, useEffect, useState } from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { Helmet } from 'react-helmet';
import sendPageViewBeaconLite, {
  addSendStaticBeaconToWindow,
} from '#app/lib/analyticsUtils/staticATITracking/sendStaticBeacon';
import sendBeacon from '#app/lib/analyticsUtils/sendBeacon';
import { ATIAnalyticsProps } from '../types';
import sendPageViewBeaconOperaMini from './sendPageViewBeaconOperaMini';

const getNoJsATIPageViewUrl = (atiPageViewUrl: string) =>
  atiPageViewUrl.includes('x8=[simorgh]')
    ? atiPageViewUrl.replace('x8=[simorgh]', 'x8=[simorgh-nojs]')
    : `${atiPageViewUrl}&x8=[simorgh-nojs]`;

const renderNoScriptTrackingPixel = (atiPageViewUrl: string) => {
  return (
    <noscript>
      <img
        height="1px"
        width="1px"
        alt=""
        // This should probably have been a styled component. But the author is
        // lazy and didn't want to write a fuzzy matcher for the unit AND e2e
        // tests (you can't predict the class names chosen by emotion)
        style={{ position: 'absolute' }}
        src={getNoJsATIPageViewUrl(atiPageViewUrl)}
      />
    </noscript>
  );
};

const addInlineScript = (script: string) => {
  return (
    <Helmet>
      <script type="text/javascript">{script}</script>
    </Helmet>
  );
};

const CanonicalATIAnalytics = ({
  pageviewParams,
  reverbParams,
}: ATIAnalyticsProps) => {
  const { isLite } = useContext(RequestContext);

  const atiPageViewUrlString =
    getEnvConfig().SIMORGH_ATI_BASE_URL + pageviewParams;

  const [reverbBeaconConfig] = useState(reverbParams);

  const [atiPageViewUrl] = useState(atiPageViewUrlString);

  useEffect(() => {
    if (!isOperaProxy()) sendBeacon(atiPageViewUrl, reverbBeaconConfig);
  }, [atiPageViewUrl, reverbBeaconConfig]);

  return (
    <>
      {addInlineScript(addSendStaticBeaconToWindow())}
      {isLite && addInlineScript(sendPageViewBeaconLite(atiPageViewUrlString))}
      {!isLite &&
        addInlineScript(sendPageViewBeaconOperaMini(atiPageViewUrlString))}
      {renderNoScriptTrackingPixel(atiPageViewUrl)}
    </>
  );
};

export default CanonicalATIAnalytics;
