import React, { useContext, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
// import styled from 'styled-components';
import pathOr from 'ramda/src/pathOr';
// import {
//   GEL_GROUP_3_SCREEN_WIDTH_MIN,
//   GEL_GROUP_4_SCREEN_WIDTH_MIN,
// } from '@bbc/gel-foundations/breakpoints';
// import {
//   GEL_SPACING_TRPL,
//   GEL_SPACING_QUAD,
// } from '@bbc/gel-foundations/spacings';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';

import Amp from './Amp';
import useToggle from '#hooks/useToggle';

// const StyledAd = styled.div`
//   /* To centre page layout for Group 4+ */
//   margin: 0 auto;
//   width: 100%; /* Needed for IE11 */
//   text-align: center;

//   @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
//     margin-top: ${GEL_SPACING_TRPL};
//   }

//   @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
//     margin-top: ${GEL_SPACING_QUAD};
//     max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
//   }
// `;

const AdContainer = () => {
  const { isAmp } = useContext(RequestContext);
  const { service, ads } = useContext(ServiceContext);
  const hasAds = pathOr(false, ['hasAds'], ads);
  const { enabled: adsEnabled } = useToggle('ads');

  if (!adsEnabled || !hasAds) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const test = ReactDOMServer.renderToString(<Amp service={service} />);
    const doc = document.getElementById('TestIframe').contentWindow.document;
    doc.open();
    doc.write(
      `<html><head><title></title><script src="https://cdn.ampproject.org/v0.js"></script></head><body>${test}</body></html>`,
    );
    doc.close();

    const host = document.querySelector('#ShadowDom');
    // Attach shadow DOM to an element through attachshadow
    const shadowRoot = host.attachShadow({ mode: 'open' });
    // Add something to the shadowRoot
    shadowRoot.innerHTML = `<script src="https://cdn.ampproject.org/v0.js"></script><script>alert("Hello")</script><h2>Shadow DOM, script does not load?</h2><div>${test}</div>`;
  }, []);

  //   const Ad = isAmp ? Amp : Canonical;
  // if (isAmp) {
  return (
    <>
      <div id="ShadowDom" />
      {!isAmp && (
        <iframe
          title="test"
          id="TestIframe"
          src="about:blank"
          style={{ width: '100%', height: '400px' }}
        />
        // <Helmet>
        //   <script
        //     async
        //     custom-element="amp-ad"
        //     src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        //   />
        // </Helmet>
      )}
      {/* <StyledAd>
        <Amp service={service} />
      </StyledAd> */}
    </>
  );
  // }
};

export default AdContainer;
