import React, { Fragment } from 'react';
import Banner from './Banner';

const parentId = 'consent';
const promptId = 'consent-prompt';

const ampOnTapHandler = type => ({ tap: [`tap:${parentId}.${type}`] });

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

const Amp = () => (
  <Fragment>
    <amp-geo layout="nodisplay">{jsonInlinedScript(ampGeoData)}</amp-geo>
    <amp-consent id={parentId} layout="nodisplay">
      {jsonInlinedScript(ampConsentData)}

      <Banner
        type="cookie"
        onAccept={ampOnTapHandler('accept')}
        onReject={ampOnTapHandler('reject')}
        promptId={promptId}
      />
    </amp-consent>
  </Fragment>
);

export default Amp;
