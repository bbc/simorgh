import React from 'react';

const configuration = {
  AmpBind: true,
  ISOCountryGroups: {
    eea: [
      'at',
      'ax',
      'be',
      'bg',
      'bl',
      'cy',
      'cz',
      'de',
      'dk',
      'ea',
      'ee',
      'es',
      'fi',
      'fr',
      'gb',
      'gf',
      'gg',
      'gi',
      'gp',
      'gr',
      'hr',
      'hu',
      'ic',
      'ie',
      'im',
      'is',
      'it',
      'je',
      'li',
      'lt',
      'lu',
      'lv',
      'mf',
      'mq',
      'mt',
      'nc',
      'nl',
      'no',
      'pf',
      'pl',
      'pm',
      'preset-us-ca',
      'pt',
      're',
      'ro',
      'se',
      'si',
      'sj',
      'sk',
      'tf',
      'uk',
      'va',
      'wf',
      'yt',
    ],
    gbOrUnknown: ['gb', 'gg', 'im', 'je', 'uk', 'unknown'],
  },
};

export const AMP_GEO_SCRIPT = (
  <script
    async
    custom-element="amp-geo"
    src="https://cdn.ampproject.org/v0/amp-geo-0.1.js"
  />
);

const AmpGeo = () => (
  <amp-geo layout="nodisplay">
    <script
      type="application/json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(configuration) }}
    />
  </amp-geo>
);

export default AmpGeo;
