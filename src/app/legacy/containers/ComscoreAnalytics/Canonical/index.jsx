/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { UserContext } from '#contexts/UserContext';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const CanonicalComscoreAnalytics = () => {
  const { personalisationEnabled } = useContext(UserContext);

  const staticAssetsPath = `${
    getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN
  }${getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;
  const comscoreScript = 'static/js/comscore/main-1.0.js';

  useEffect(() => {
    const csUcfr = personalisationEnabled ? '1' : '';
    /* eslint-disable no-underscore-dangle */
    window._comscore = window._comscore || [];
    window._comscore.push({ c1: '2', c2: '17986528', cs_ucfr: csUcfr });
  }, [personalisationEnabled]);

  return (
    <Helmet>
      <script
        async
        type="text/javascript"
        src={`${staticAssetsPath}${comscoreScript}`}
      />
      <noscript>
        {`<img src="https://sb.scorecardresearch.com/p?c1=2&c2=17986528&cv=2.0&cj=1" />`}
      </noscript>
    </Helmet>
  );
};

export default CanonicalComscoreAnalytics;
