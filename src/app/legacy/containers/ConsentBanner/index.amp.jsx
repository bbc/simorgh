import React from 'react';
import styled from '@emotion/styled';
import AmpGeo from '#components/AmpGeo';
import useToggle from '#hooks/useToggle';
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
  & amp-consent {
    position: static;
    display: block;
  }
`;

const Amp = () => {
  const { enabled: privacyToggle } = useToggle('privacyPolicy');
  return (
    <AmpConsentWrapper>
      <AmpGeo />
      <amp-consent id="consent" layout="nodisplay">
        {jsonInlinedScript(ampConsentData)}
        <div id="consent-prompt">
          {privacyToggle && (
            <Banner
              type="privacy"
              acceptAction="tap:cookie.show, privacy.hide, AMP.setState({ isManagingSettings: false }), dataCollectionHeading.focus"
              rejectAction="tap:cookie.show, privacy.hide"
              hideAction="tap:brandLink.focus, privacy.hide"
              promptId="privacy"
            />
          )}
          <Banner
            type="cookie"
            acceptAction="tap:brandLink.focus, consent.accept"
            rejectAction="tap:brandLink.focus, consent.reject"
            hideAction="tap:brandLink.focus, cookie.hide"
            promptId="cookie"
            {...(privacyToggle && { hidden: true })}
          />
        </div>
      </amp-consent>
    </AmpConsentWrapper>
  );
};

export default Amp;
