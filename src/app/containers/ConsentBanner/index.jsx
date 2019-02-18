import React, { Fragment } from 'react';
import ConsentBanner from '../../components/ConsentBanner';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';

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
              <ServiceContextConsumer>
                {({ translations }) => {
                  const { consentBanner } = translations;
                  return (
                    <ConsentBanner
                      title={consentBanner.title}
                      description={consentBanner.description}
                      accept={consentBanner.accept}
                      reject={consentBanner.reject}
                      acceptButtonProps={ampOnTapHandler('accept')}
                      rejectButtonProps={ampOnTapHandler('reject')}
                      promptId={promptId}
                    />
                  );
                }}
              </ServiceContextConsumer>
            </amp-consent>
          </Fragment>
        );
      }
      return null;
    }}
  </PlatformContextConsumer>
);

export default ConsentBannerContainer;
