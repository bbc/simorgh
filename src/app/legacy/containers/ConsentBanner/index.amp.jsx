import React from 'react';
import styled from '@emotion/styled';
import AmpGeo from '#components/AmpGeo';
import Banner from './Banner/index.amp';

const ampConsentData = {
  consents: {
    'user-consent': {
      promptIfUnknownForGeoGroup: 'eea',
      promptUI: 'consent-prompt',
    },
  },
  policy: {
    default: {
      waitFor: {
        'user-consent': [],
      },
      timeout: {
        seconds: 0,
        fallbackAction: 'reject',
      },
    },
  },
};

const jsonInlinedScript = data => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

// Style `amp-consent` as child due to inability to set
// `layout` attribute on styled `amp-consent` component
const AmpConsentWrapper = styled.div`
  /* stylelint-disable-next-line selector-type-no-unknown */
  & amp-consent {
    position: static;
    display: block;
  }
`;

const Amp = () => (
  <AmpConsentWrapper>
    <AmpGeo />
    <amp-consent id="consent" layout="nodisplay">
      {jsonInlinedScript(ampConsentData)}
      <div id="consent-prompt">
        <Banner
          type="privacy"
          acceptAction="tap:cookie.show, privacy.hide, AMP.setState({ isManagingSettings: false }), dataCollectionHeading.focus"
          rejectAction="tap:cookie.show, privacy.hide"
          promptId="privacy"
        />
        <Banner
          type="cookie"
          acceptAction="tap:brandLink.focus, consent.accept"
          rejectAction="tap:brandLink.focus, consent.reject"
          promptId="cookie"
          hidden
        />
      </div>
    </amp-consent>
  </AmpConsentWrapper>
);

export default Amp;
