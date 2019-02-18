import React, { Fragment } from 'react';
import ConsentBanner from '../../components/ConsentBanner';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';

const parentId = 'consent';
const promptId = 'consent-prompt';

const ampOnTapHandler = type => ({ on: `tap:${parentId}.${type}` });

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

const ConsentBannerContainer = () => (
  <PlatformContextConsumer>
    {platform => {
      if (platform === 'amp') {
        return (
          <Fragment>
            <amp-geo layout="nodisplay">
              {jsonInlinedScript(ampGeoData)}
            </amp-geo>
            <amp-consent id={parentId} layout="nodisplay">
              {jsonInlinedScript(ampConsentData)}
              <ConsentBanner
                title="Let us know you agree to cookies"
                description="We use cookies to give you the best online experience. Please let us know if you agree to all of these cookies."
                accept="Accept"
                reject="Reject"
                acceptButtonProps={ampOnTapHandler('accept')}
                rejectButtonProps={ampOnTapHandler('reject')}
                promptId={promptId}
              />
            </amp-consent>
          </Fragment>
        );
      }
      return null;
    }}
  </PlatformContextConsumer>
);

export default ConsentBannerContainer;
