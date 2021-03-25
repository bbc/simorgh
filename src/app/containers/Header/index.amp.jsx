import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import ConsentBanner from '../ConsentBanner';
import BrandContainer from '../Brand';

const AmpScriptWrapper = styled.div`
  & amp-script {
    opacity: 1;
  }
`;

const AmpHeader = ({ borderBottom, skipLink, scriptLink }) => {
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
          const accept = document.querySelector('button[data-cookie-banner="accept"]');
          const reject = document.querySelector('button[data-cookie-banner="reject"]');
          accept.addEventListener('click', () => {
            document.querySelector('#brandContainer a').focus();
          });
        </script>
      </Helmet>
      <AmpScriptWrapper>
        <amp-script
          script="focus-management"
          layout="container"
          data-ampdevmode
        >
          <ConsentBanner />
          <BrandContainer
            borderBottom={borderBottom}
            skipLink={skipLink}
            scriptLink={scriptLink}
            id="brandContainer"
          />
        </amp-script>
      </AmpScriptWrapper>
    </>
  );
};

export default AmpHeader;
