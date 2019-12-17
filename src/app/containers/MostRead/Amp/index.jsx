import React from 'react';
import { string } from 'prop-types';
import { Helmet } from 'react-helmet';
import { Template } from 'react-amphtml';
import {
  AMP_ACCESS_JS,
  AMP_MUSTACHE_JS,
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

const AmpMostRead = ({ endpoint }) => (
  <>
    <Helmet>
      {AMP_ACCESS_JS}
      {AMP_MUSTACHE_JS}
      {AMP_ACCESS_FETCH(endpoint)}
    </Helmet>

    <section amp-access="totalRecords > 0">
      <Template
        specName="default"
        type="amp-mustache"
        amp-access-template="true"
      >
        {'{{#records}}'}
        <div>
          <p>{'{{promo.headlines.shortHeadline}}'}</p>
          <p>{'{{promo.locators.assetUri}}'}</p>
        </div>
        {'{{/records}}'}
      </Template>
    </section>
  </>
);

AmpMostRead.propTypes = {
  endpoint: string.isRequired,
};

export default AmpMostRead;
