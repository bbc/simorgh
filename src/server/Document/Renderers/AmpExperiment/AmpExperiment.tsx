/** @jsx jsx */
import { jsx } from '@emotion/react';

const data = {
  someExperiment: {
    variants: {
      variant_1: 50,
      variant_2: 50,
    },
  },
};

const JsonInlinedScript = () => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpATIAnalytics = () => {
  return <amp-experiment>{JsonInlinedScript()}</amp-experiment>;
};

export default AmpATIAnalytics;
