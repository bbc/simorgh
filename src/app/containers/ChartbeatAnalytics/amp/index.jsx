import React from 'react';
import { string, number } from 'prop-types';

const chartbeatAmpConfigOptions = options => ({
  vars: {
    uid: options.chartbeatUID,
    title: options.title,
    sections: options.sections,
    domain: options.domain,
    contentType: options.type,
    ...(!!options.referrer && { virtualReferrer: options.referrer }),
    ...(!!options.cookie && { idSync: { bbc_hid: options.cookie } }),
  },
  triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
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
  title,
  referrer,
}) => (
  <amp-analytics type="chartbeat">
    {JsonInlinedScript(
      chartbeatAmpConfigOptions({
        domain,
        type,
        sections,
        cookie,
        chartbeatUID,
        title,
        referrer,
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
  title: string.isRequired,
  referrer: string,
};

AmpChartbeatBeacon.defaultProps = {
  cookie: null,
  referrer: null,
};

export default AmpChartbeatBeacon;
