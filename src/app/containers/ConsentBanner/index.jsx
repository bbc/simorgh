import React from 'react';
import CookieBanner from '../../components/CookieBanner';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';

const idParent = 'consent';
const idPrompt = 'consent-prompt';

const ampConsentData = {
  consents: {
    'user-consent': {
      promptIfUnknownForGeoGroup: 'eu',
      promptUI: prompt,
    },
  },
};

const ConsentBanner = () => (
  <PlatformContextConsumer>
    {platform => {
      if (platform === 'amp') {
        return (
          <amp-consent id={idParent} layout="nodisplay">
            {/* eslint-disable react/no-danger */}
            <script
              type="application/json"
              dangerouslySetInnerHTML={{
                __html: ampConsentData,
              }}
            />
            <p>hi</p>
            <CookieBanner idParent={idParent} idPrompt={idPrompt} />
          </amp-consent>
        );
      }
      return null;
    }}
  </PlatformContextConsumer>
);

export default ConsentBanner;
