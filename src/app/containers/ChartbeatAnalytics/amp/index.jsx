import React from 'react';
import { string, number, bool } from 'prop-types';

const chartbeatAmpConfigOptions = options => {
  const vars = {
    uid: options.chartbeatUID,
    title: options.title,
    sections: options.sections,
    domain: options.domain,
    contentType: options.type,
  };

  if (options.hasReferrer) {
    vars.virtualReferrer = options.referrer;
  }

  if (options.hasCookie) {
    vars.idSync = {
      bbc_hid: options.cookie,
    };
  }

  return { vars };
};

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
  hasCookie,
  title,
  referrer,
  hasReferrer,
}) => (
  <amp-analytics type="chartbeat">
    {JsonInlinedScript(
      chartbeatAmpConfigOptions({
        domain,
        type,
        sections,
        cookie,
        chartbeatUID,
        hasCookie,
        title,
        referrer,
        hasReferrer,
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
  hasCookie: bool.isRequired,
  title: string.isRequired,
  hasReferrer: bool.isRequired,
  referrer: string,
};

AmpChartbeatBeacon.defaultProps = {
  cookie: null,
  referrer: null,
};

export default AmpChartbeatBeacon;
