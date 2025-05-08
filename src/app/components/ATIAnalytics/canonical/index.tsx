import React, { useContext, useEffect, useState } from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { Helmet } from 'react-helmet';
import sendPageViewBeaconLite, {
  addSendStaticBeaconToWindow,
} from '#app/lib/analyticsUtils/staticATITracking/sendStaticBeacon';
import sendBeacon from '#app/lib/analyticsUtils/sendBeacon';
import addInlineScript from '#app/lib/utilities/addInlineScript';
import { ATIAnalyticsProps } from '../types';
import trackingPixelUrl from './getNoScriptTrackingPixelUrl';
import sendPageViewBeaconOperaMini from './sendPageViewBeaconOperaMini';

type ATIAnalyticsPropsExport = Pick<ATIAnalyticsProps, 'reverbParams'>;

const renderNoScriptTrackingPixel = (
  reverbParams: ATIAnalyticsPropsExport['reverbParams'],
) => {
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
        src={trackingPixelUrl(reverbParams)}
      />
    </noscript>
  );
};

const addScript = (script: string) => {
  return <Helmet>{addInlineScript({ script })}</Helmet>;
};

const CanonicalATIAnalytics = ({
  pageviewParams,
  reverbParams,
}: ATIAnalyticsProps) => {
  const { isLite } = useContext(RequestContext);
  console.log(JSON.stringify(reverbParams));

  const atiPageViewUrlString =
    getEnvConfig().SIMORGH_ATI_BASE_URL + pageviewParams;

  const [reverbBeaconConfig] = useState(reverbParams);

  const [atiPageViewUrl] = useState(atiPageViewUrlString);

  useEffect(() => {
    if (!isOperaProxy()) sendBeacon(atiPageViewUrl, reverbBeaconConfig);
  }, [atiPageViewUrl, reverbBeaconConfig]);

  return (
    <>
      {addScript(addSendStaticBeaconToWindow())}
      {isLite && addScript(sendPageViewBeaconLite(atiPageViewUrlString))}
      {!isLite && addScript(sendPageViewBeaconOperaMini(atiPageViewUrlString))}
      {renderNoScriptTrackingPixel(reverbParams)}
    </>
  );
};

export default CanonicalATIAnalytics;
