import React, { Fragment } from 'react';
import CookieBanner from '../../components/CookieBanner';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';

const idParent = 'consent';
const idPrompt = 'consent-prompt';

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
      promptUI: idPrompt,
    },
  },
};

const ConsentBanner = () => (
  <PlatformContextConsumer>
    {platform => {
      if (platform === 'amp') {
        return (
          <Fragment>
            {/* eslint-disable react/no-danger */}
            <amp-geo>
              <script
                type="application/json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ampGeoData) }}
              />
            </amp-geo>
            <amp-consent id={idParent} layout="nodisplay">
              <script
                type="application/json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(ampConsentData),
                }}
              />
              <CookieBanner idParent={idParent} idPrompt={idPrompt} />
            </amp-consent>
          </Fragment>
        );
      }
      return null;
    }}
  </PlatformContextConsumer>
);

export default ConsentBanner;
