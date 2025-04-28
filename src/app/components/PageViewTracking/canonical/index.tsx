import React, { useContext, useEffect, useState } from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { Helmet } from 'react-helmet';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { PageViewTrackingParams } from '../types';
import sendPageViewBeaconOperaMini from './sendPageViewBeaconOperaMini';
import {
  addSendStaticBeaconToWindow,
  sendStaticBeacon as sendPageViewBeaconLite,
} from './staticBeacon';

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

export default ({ pageViewParams, reverbParams }: PageViewTrackingParams) => {
  const { isLite } = useContext(RequestContext);

  const atiPageViewUrlString =
    getEnvConfig().SIMORGH_ATI_BASE_URL + pageViewParams;

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
