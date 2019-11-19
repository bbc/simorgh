import React from 'react';
import { Helmet } from 'react-helmet';
import { string } from 'prop-types';
import {
  AMP_LIST_JS,
  AMP_MUSTACHE_JS,
  AMP_BIND_JS,
  AMP_ACCESS_JS,
} from '@bbc/psammead-assets/amp-boilerplate';

const AMP_ACCESS_DATA = endpoint => ({
  authorization: endpoint,
  noPingback: true,
});

const AMP_ACCESS_FETCH = endpoint => (
  <script id="amp-access" type="application/json">
    {JSON.stringify(AMP_ACCESS_DATA(endpoint))}
  </script>
);

const AMPMostRead = ({ endpoint }) => {
  return (
    <>
      <Helmet htmlAttributes={{ amp: '' }}>
        {AMP_LIST_JS}
        {AMP_MUSTACHE_JS}
        {AMP_BIND_JS}
        {AMP_ACCESS_JS}
        {AMP_ACCESS_FETCH(endpoint)}
      </Helmet>
      <section amp-access="totalRecords > 0">
        <h2>totalRecods exists and is available</h2>
        <template
          amp-access-template="true"
          type="amp-mustache"
          dangerouslySetInnerHTML={{
            __html: `
            <p>lastRecordTimeStamp: {{lastRecordTimeStamp}}</p>
            <p>generated: {{generated}}</p>
            <p>firstRecordTimeStamp: {{firstRecordTimeStamp}}
            <p>TotalRecords: {{totalRecords}}</p>  
            <ul>
            {{#records}}
              <li>{{promo.timestamp}}</li>
              <li>{{promo.headlines.headline}}</li>
              <li>{{promo.promo.locators.assetUri}}</li>
            {{/records}}
           </ul>`,
          }}
        />
      </section>
    </>
  );
};

AMPMostRead.propTypes = {
  endpoint: string.isRequired,
};

export default AMPMostRead;
