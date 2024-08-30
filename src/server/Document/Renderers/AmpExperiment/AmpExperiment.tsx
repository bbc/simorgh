/** @jsx jsx */
import { jsx } from '@emotion/react';

const data = {
  someExperiment: {
    variants: {
      control: 33,
      variant_1: 33,
      variant_2: 33,
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
