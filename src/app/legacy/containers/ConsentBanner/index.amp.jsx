import React from 'react';
import styled from '@emotion/styled';
import AmpGeo from '#components/AmpGeo';
import isLive from '#lib/utilities/isLive';
import Banner from './Banner/index.amp';

// Funding Choices CMP, to be replaced with Sourcepoint
const fcConsentData = {
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

// Sourcepoint CMP, will replace Funding Choices
const spConsentData = {
  checkConsentHref:
    'https://cdn.privacy-mgmt.com/wrapper/tcfv2/v1/amp-v2?authId=CLIENT_ID',
  consentRequired: 'remote',
  consentInstanceId: 'sourcepoint',
  promptUISrc:
    'https://cdn.privacy-mgmt.com/amp/unified/index.html?authId=CLIENT_ID&source_url=SOURCE_URL',
  cookies: {
    enabled: true,
    'AMP-CONSENT': { value: 'LINKER_PARAM(authId, _a)' },
  },
  clientConfig: {
    accountId: 1786,
    propertyHref: 'https://www.bbc.com',
    stageCampaign: false,
    pmTab: 'purposes',
    privacyManagerId: 648235,
    initialHeight: 80,
  },
};

const ampConsentData = isLive() ? fcConsentData : spConsentData;

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
          hideAction="tap:brandLink.focus, privacy.hide"
          promptId="privacy"
        />
        <Banner
          type="cookie"
          acceptAction="tap:brandLink.focus, consent.accept"
          rejectAction="tap:brandLink.focus, consent.reject"
          hideAction="tap:brandLink.focus, cookie.hide"
          promptId="cookie"
          hidden
        />
      </div>
    </amp-consent>
  </AmpConsentWrapper>
);

export default Amp;
