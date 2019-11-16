import React from 'react';
import { Helmet } from 'react-helmet';
import { string } from 'prop-types';

const AMP_LIST = (
  <script
    async
    custom-element="amp-list"
    src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
  />
);

const AMP_MUSTACHE = (
  <script
    async
    custom-template="amp-mustache"
    src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
  />
);

const AMP_BIND = (
  <script
    async
    custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
  />
);

const AMP_ACCESS = (
  <script
    async
    custom-element="amp-access"
    src="https://cdn.ampproject.org/v0/amp-access-0.1.js"
  />
);

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
        {AMP_LIST}
        {AMP_MUSTACHE}
        {AMP_BIND}
        {AMP_ACCESS}
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
            <p>TotalRecords: {{totalRecords}}</P>`,
          }}
        />
      </section>
      <amp-list
        layout="fixed-height"
        height="100"
        src={endpoint}
        binding="no"
        items="records"
        max-items={10}
      >
        <template
          type="amp-mustache"
          dangerouslySetInnerHTML={{
            __html: `<ul key={{id}}>
          <li>{{promo.timestamp}}</li>
          <li>{{promo.headlines.headline}}</li>
          <li>{{promo.locators.assetUri}}</li>
          </ul>`,
          }}
        />
      </amp-list>
    </>
  );
};

AMPMostRead.propTypes = {
  endpoint: string.isRequired,
};

export default AMPMostRead;
