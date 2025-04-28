import React, { useContext, useEffect, useState } from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { Helmet } from 'react-helmet';
import { reverbUrlHelper } from '@bbc/reverb-url-helper';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { ATIAnalyticsProps } from '../types';
import sendBeaconOperaMiniScript from './sendBeaconOperaMiniScript';
import sendBeaconLite from './sendBeaconLite';

type ATIAnalyticsPropsExport = Pick<ATIAnalyticsProps, 'reverbParams'>;

const trackingPixelUrl = (ATIAnalyticsPropsExport: object) =>
  reverbUrlHelper.getTrackingPixelSrc(ATIAnalyticsPropsExport);

const renderNoScriptTrackingPixel = (ATIAnalyticsPropsExport: object) => {
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
        src={trackingPixelUrl(ATIAnalyticsPropsExport)}
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

const addLiteScript = (atiPageViewUrlString: string) => {
  const script = sendBeaconLite(atiPageViewUrlString);

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
      {isLite && addLiteScript(atiPageViewUrlString)}
      {!isLite && addOperaMiniExtremeScript(atiPageViewUrlString)}
      {renderNoScriptTrackingPixel(ATIAnalyticsPropsExport)}
    </>
  );
};

export default CanonicalATIAnalytics;
