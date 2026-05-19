import { eea, gbOrUnknown } from '#app/lib/utilities/cookieCountries';

const configuration = {
  AmpBind: true,
  ISOCountryGroups: {
    eea,
    gbOrUnknown,
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
      // biome-ignore lint/security/noDangerouslySetInnerHtml: we want this
      dangerouslySetInnerHTML={{ __html: JSON.stringify(configuration) }}
    />
  </amp-geo>
);

export default AmpGeo;
