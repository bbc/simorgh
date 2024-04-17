import React, { useEffect, useState } from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { ATIAnalyticsProps } from '../types';

const getNoJsATIPageViewUrl = (atiPageViewUrl: string) =>
  atiPageViewUrl.includes('x8=[simorgh]')
    ? atiPageViewUrl.replace('x8=[simorgh]', 'x8=[simorgh-nojs]')
    : `${atiPageViewUrl}&x8=[simorgh-nojs]`;

const renderNoScriptTrackingPixel = (atiPageViewUrl: string) => (
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

const CanonicalATIAnalytics = ({ pageviewParams }: ATIAnalyticsProps) => {
  const [atiPageViewUrl] = useState(
    getEnvConfig().SIMORGH_ATI_BASE_URL + pageviewParams,
  );

  useEffect(() => {
    sendBeacon(atiPageViewUrl);
  }, [atiPageViewUrl]);

  return renderNoScriptTrackingPixel(atiPageViewUrl);
};

export default CanonicalATIAnalytics;
