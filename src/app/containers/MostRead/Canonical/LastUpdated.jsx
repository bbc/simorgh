import React from 'react';
import { number, string, shape } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import Timestamp from '@bbc/psammead-timestamp-container';
import { shouldRenderLastUpdated } from '../utilities';

const LastUpdated = ({ locale, prefix, script, service, timestamp }) =>
  shouldRenderLastUpdated(timestamp) && (
    <Timestamp
      timestamp={timestamp}
      dateTimeFormat="YYYY-MM-DD"
      prefix={prefix}
      format="LL"
      script={script}
      service={service}
      locale={locale}
      padding={false}
    />
  );

LastUpdated.propTypes = {
  locale: string.isRequired,
  prefix: string.isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  timestamp: number.isRequired,
};

export default LastUpdated;
