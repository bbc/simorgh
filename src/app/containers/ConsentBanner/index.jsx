import React from 'react';
import CookieBanner from '../../components/CookieBanner';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';

const ConsentBanner = () => (
  <PlatformContextConsumer>
    {platform => {
      if (platform === 'amp') {
        return (
          <amp-consent id="amp-o-user-consent" layout="nodisplay">
            <script type="application/json">
              {/* {
              "consents": {
                "user-consent": {
                  "promptIfUnknownForGeoGroup": "eu",
                  "promptUI": "amp-o-user-consent-dialog"
                }
              }
            } */}
            </script>
            <CookieBanner />
          </amp-consent>
        );
      }
      return null;
    }}
  </PlatformContextConsumer>
);

export default ConsentBanner;
