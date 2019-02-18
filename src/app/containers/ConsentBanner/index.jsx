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

const ConsentBannerContainer = () => (
  <PlatformContextConsumer>
    {platform => {
      if (platform === 'amp') {
        return (
          <Fragment>
            {/* eslint-disable react/no-danger */}
            <amp-geo layout="nodisplay">
              <script
                type="application/json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ampGeoData) }}
              />
            </amp-geo>
            <amp-consent id={parentId} layout="nodisplay">
              <script
                type="application/json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(ampConsentData),
                }}
              />
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
