import React, { useContext, useEffect, useState } from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { Helmet } from 'react-helmet';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { ATIAnalyticsProps } from '../types';
import sendBeaconOperaMiniScript from './sendBeaconOperaMiniScript';
import { addSendStaticBeaconToWindow, sendStaticBeacon } from './staticBeacon';
import trackingPixelUrl from './getPixelUrl';

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

const addOperaMiniExtremeScript = (atiPageViewUrlString: string) => {
  const script = sendBeaconOperaMiniScript(atiPageViewUrlString);

  return (
    <Helmet>
      <script type="text/javascript">{script}</script>
    </Helmet>
  );
};

const addStaticBeaconScript = () => {
  const script = addSendStaticBeaconToWindow();
  return (
    <Helmet>
      <script type="text/javascript">{script}</script>
    </Helmet>
  );
};

const sendStaticBeaconScript = (atiPageViewUrlString: string) => {
  const script = sendStaticBeacon(atiPageViewUrlString);
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
      {addStaticBeaconScript()}
      {isLite && sendStaticBeaconScript(atiPageViewUrlString)}
      {!isLite && addOperaMiniExtremeScript(atiPageViewUrlString)}
      {renderNoScriptTrackingPixel(reverbParams)}
    </>
  );
};

export default CanonicalATIAnalytics;
