import React, { useContext, useEffect, useState, Fragment } from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { Helmet } from 'react-helmet';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { ATIAnalyticsProps } from '../types';

const getNoJsATIPageViewUrl = (atiPageViewUrl: string) =>
  atiPageViewUrl.includes('x8=[simorgh]')
    ? atiPageViewUrl.replace('x8=[simorgh]', 'x8=[simorgh-nojs]')
    : `${atiPageViewUrl}&x8=[simorgh-nojs]`;

const renderNoScriptTrackingPixel = (
  atiPageViewUrl: string,
  isLite: boolean,
) => {
  const ImgPixelWrapper = isLite ? Fragment : 'noscript';

  return (
    <ImgPixelWrapper>
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
    </ImgPixelWrapper>
  );
};

const addOperaMiniExtremeScript = (atiPageViewUrlString: string) => {
  const script = `
    if (${isOperaProxy.toString()}()) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '${atiPageViewUrlString}', true);
      xhr.withCredentials = true;
      xhr.send();
      console.log('Technically the line above me has popped off');
    }
  `;

  return (
    <Helmet>
      <script type="text/javascript">{script}</script>
    </Helmet>
  );
};

const CanonicalATIAnalytics = ({ pageviewParams }: ATIAnalyticsProps) => {
  const { isLite } = useContext(RequestContext);

  const atiPageViewUrlString =
    getEnvConfig().SIMORGH_ATI_BASE_URL + pageviewParams;

  const [atiPageViewUrl] = useState(atiPageViewUrlString);

  useEffect(() => {
    if (!isOperaProxy()) sendBeacon(atiPageViewUrl);
  }, [atiPageViewUrl]);

  return (
    <>
      {addOperaMiniExtremeScript(atiPageViewUrlString)}
      {renderNoScriptTrackingPixel(atiPageViewUrl, isLite)}
    </>
  );
};

export default CanonicalATIAnalytics;
