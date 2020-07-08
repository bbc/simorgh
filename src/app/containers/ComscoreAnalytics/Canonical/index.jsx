/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { UserContext } from '#contexts/UserContext';

const CanonicalComscoreAnalytics = () => {
  const { cookiePolicy } = useContext(UserContext);

  let csUcfr = 0;
  if (cookiePolicy) {
    csUcfr = cookiePolicy.slice(-1);
  }

  return (
    <Helmet>
      <script async type="text/javascript">
        {`
        var _comscore = [{ c1: "2", c2: "17986528", cs_ucfr: "${csUcfr}" }];
        (function() {
            var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
            s.src = "https://sb.scorecardresearch.com/beacon.js";
            el.parentNode.insertBefore(s, el);
        })();
      `}
      </script>
      <noscript>
        {`<img src="https://sb.scorecardresearch.com/p?c1=2&c2=17986528&cs_ucfr=${csUcfr}&cv=2.0&cj=1" />`}
      </noscript>
    </Helmet>
  );
};

export default CanonicalComscoreAnalytics;
