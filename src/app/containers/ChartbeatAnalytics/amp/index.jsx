import React from 'react';
import {
  chartbeatUID,
  getSylphidCookie,
} from '../../../lib/analyticsUtils/chartbeat';

const domain = 'test.bbc.co.uk';

const chartbeatAmpConfigOptions = () => ({
  vars: {
    uid: chartbeatUID,
    sections: 'section 1, section 2',
    canonicalPath: 'canonicalPath',
    domain,
    contentType: 'some kind of type',
    idSync: {
      bbc_hid: getSylphidCookie(),
    },
  },
});

const JsonInlinedScript = data => (
  <script
    async
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpChartbeatBeacon = () => (
  <amp-analytics type="chartbeat">
    {JsonInlinedScript(chartbeatAmpConfigOptions())}
  </amp-analytics>
);

export default AmpChartbeatBeacon;
