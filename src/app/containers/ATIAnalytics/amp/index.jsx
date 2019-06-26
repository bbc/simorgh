import React from 'react';
import { string } from 'prop-types';
import getAmpAnalyticsJson from './ampAnalyticsJson';
import { atiBaseUrl } from '../atiUrl';
import { RequestContext } from '../../../contexts/RequestContext';

const JsonInlinedScript = data => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpATIAnalytics = ({ pageviewParams }) => {
  const { env } = React.useContext(RequestContext);
  return (
    <amp-analytics>
      {JsonInlinedScript(
        getAmpAnalyticsJson({
          baseUrl: atiBaseUrl(env),
          pageviewParams,
        }),
      )}
    </amp-analytics>
  );
};

AmpATIAnalytics.propTypes = {
  pageviewParams: string.isRequired,
};

export default AmpATIAnalytics;
