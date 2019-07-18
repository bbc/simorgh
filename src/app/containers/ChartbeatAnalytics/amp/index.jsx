import React from 'react';
import { string, number } from 'prop-types';

const chartbeatAmpConfigOptions = options => ({
  vars: {
    uid: options.chartbeatUID,
    sections: options.sections,
    domain: options.domain,
    contentType: options.type,
    idSync: {
      bbc_hid: options.cookie,
    },
  },
});

const JsonInlinedScript = data => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpChartbeatBeacon = ({
  domain,
  type,
  sections,
  cookie,
  chartbeatUID,
}) => (
  <amp-analytics type="chartbeat">
    {JsonInlinedScript(
      chartbeatAmpConfigOptions({
        domain,
        type,
        sections,
        cookie,
        chartbeatUID,
      }),
    )}
  </amp-analytics>
);

AmpChartbeatBeacon.propTypes = {
  domain: string.isRequired,
  type: string.isRequired,
  sections: string.isRequired,
  cookie: string,
  chartbeatUID: number.isRequired,
};

AmpChartbeatBeacon.defaultProps = {
  cookie: null,
};

export default AmpChartbeatBeacon;
