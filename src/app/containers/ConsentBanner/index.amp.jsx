import React from 'react';
import styled from 'styled-components';
import Banner from './Banner/index.amp';

const parentId = 'consent';
const promptId = 'consent-prompt';
const privacyId = 'privacy';
const cookieId = 'cookie';

const ampGeoData = {
  ISOCountryGroups: {
    eu: [
      'at',
      'be',
      'bg',
      'cy',
      'cz',
      'de',
      'dk',
      'ee',
      'es',
      'fi',
      'fr',
      'gb',
      'gr',
      'hr',
      'hu',
      'ie',
      'is',
      'it',
      'li',
      'lt',
      'lu',
      'lv',
      'mt',
      'nl',
      'no',
      'pl',
      'pt',
      'ro',
      'se',
      'si',
      'sl',
    ],
  },
};

const ampConsentData = {
  consents: {
    'user-consent': {
      promptIfUnknownForGeoGroup: 'eu',
      promptUI: promptId,
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

const AmpConsentWrapper = styled.div`
  & amp-consent {
    position: initial;
    display: block;
  }
`;

const Amp = () => (
  <AmpConsentWrapper>
    <amp-geo layout="nodisplay">{jsonInlinedScript(ampGeoData)}</amp-geo>
    <amp-consent id={parentId} layout="nodisplay">
      {jsonInlinedScript(ampConsentData)}
      <div id={promptId}>
        <Banner
          type="privacy"
          onAccept={{ tap: [`${cookieId}.show, ${privacyId}.hide`] }}
          onReject={{ tap: [`${cookieId}.show, ${privacyId}.hide`] }}
          promptId={privacyId}
        />
        <Banner
          type="cookie"
          onAccept={{ tap: [`${parentId}.accept`] }}
          onReject={{ tap: [`${parentId}.reject`] }}
          promptId={cookieId} 
          hidden
        />
      </div>
    </amp-consent>
  </AmpConsentWrapper>
);

export default Amp;
