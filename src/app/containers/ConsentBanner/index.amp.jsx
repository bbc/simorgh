import React from 'react';
import styled from 'styled-components';
import AmpGeo from '@bbc/psammead-amp-geo';
import Banner from './Banner/index.amp';

const parentId = 'consent';
const promptId = 'consent-prompt';
const privacyId = 'privacy';
const cookieId = 'cookie';

const ampConsentData = {
  consents: {
    'user-consent': {
      promptIfUnknownForGeoGroup: 'eea',
      promptUI: promptId,
    },
  },
};

const jsonInlinedScript = (data) => (
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
    <amp-consent id={parentId} layout="nodisplay">
      {jsonInlinedScript(ampConsentData)}
      <div id={promptId}>
        <Banner
          type="privacy"
          acceptAction={`tap:${cookieId}.show, ${privacyId}.hide`}
          rejectAction={`tap:${cookieId}.show, ${privacyId}.hide`}
          promptId={privacyId}
        />
        <Banner
          type="cookie"
          acceptAction={`tap:${parentId}.accept`}
          rejectAction={`tap:${parentId}.reject`}
          promptId={cookieId}
          hidden
        />
      </div>
    </amp-consent>
  </AmpConsentWrapper>
);

export default Amp;
