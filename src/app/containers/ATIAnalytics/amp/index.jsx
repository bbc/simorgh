import React from 'react';
import { string } from 'prop-types';
import getAmpAnalyticsJson from './ampAnalyticsJson';

const JsonInlinedScript = data => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpATIAnalytics = ({ pageviewParams }) => {
  return (
    <>
      <amp-bind-macro
        id="resolveDest"
        arguments="group"
        expression="group.contains('gbUnknown') ? 123 : 456"
      >
        <amp-analytics>
          {JsonInlinedScript(
            getAmpAnalyticsJson({
              baseUrl: process.env.SIMORGH_ATI_BASE_URL,
              pageviewParams,
            }),
          )}
        </amp-analytics>
      </amp-bind-macro>
    </>
  );
};

AmpATIAnalytics.propTypes = {
  pageviewParams: string.isRequired,
};

export default AmpATIAnalytics;
