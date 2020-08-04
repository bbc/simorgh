/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { UserContext } from '#contexts/UserContext';
import onClient from '#lib/utilities/onClient';

const CanonicalComscoreAnalytics = () => {
  const { personalisationEnabled } = useContext(UserContext);
  const [comscoreConsent, setComscoreConsent] = useState('0');

  const staticAssetsPath = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

  useEffect(() => {
    const csUcfr = personalisationEnabled ? '1' : '0';
    /* eslint-disable no-underscore-dangle */
    window._comscore = window._comscore || [];
    window._comscore.push({ c1: '2', c2: '17986528', cs_ucfr: csUcfr });
    setComscoreConsent(csUcfr);
  }, [personalisationEnabled]);

  // We do not want to return the comscore script on the server
  if (!onClient()) {
    return null;
  }

  return (
    <Helmet>
      <script
        async
        type="text/javascript"
        src={`${staticAssetsPath}static/js/comscore-1.0.js`}
      />
      <noscript>
        {`<img src="https://sb.scorecardresearch.com/p?c1=2&c2=17986528&cs_ucfr=${comscoreConsent}&cv=2.0&cj=1" />`}
      </noscript>
    </Helmet>
  );
};

export default CanonicalComscoreAnalytics;
