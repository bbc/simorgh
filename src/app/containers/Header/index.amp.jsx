import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import ConsentBanner from '../ConsentBanner';
import BrandContainer from '../Brand';
import { RequestContext } from '#contexts/RequestContext';

const AmpHeader = ({ borderBottom, skipLink, scriptLink }) => {
  const { isAmp } = useContext(RequestContext);

  return (
    <>
      <Helmet>
        <meta
          name="amp-script-src"
          content="sha384-0Nhuv9SOpZns15lGGEMcMq9c2sT10h_m1Fy_680khzwwEHT_pHZZ-G3gJQVsHvHt"
        />
        <script
          async
          custom-element="amp-script"
          src="https://cdn.ampproject.org/v0/amp-script-0.1.js"
        />
        <script id="focus-management" type="text/plain" target="amp-script">
          console.log(document);
        </script>
      </Helmet>
      <amp-script script="focus-management" layout="container">
        <ConsentBanner />
        <BrandContainer
          borderBottom={borderBottom}
          skipLink={skipLink}
          scriptLink={scriptLink}
        />
      </amp-script>
    </>
  );
};

export default AmpHeader;