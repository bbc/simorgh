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

const AmpMostRead = ({ endpoint }) => (
  <>
    <Helmet htmlAttributes={{ amp: '' }}>
      {AMP_LIST}
      {AMP_MUSTACHE}
      {AMP_BIND}
      <script
        async
        custom-element="amp-access"
        src="https://cdn.ampproject.org/v0/amp-access-0.1.js"
      ></script>
      <script id="amp-access" src={endpoint} type="application/json"></script>
    </Helmet>

    <amp-list
      layout="fixed-height"
      height="100"
      src={endpoint}
      single-item
      binding="no"
      max-items={10}
    >
      <template
        type="amp-mustache"
        dangerouslySetInnerHTML={{
          __html: `<ul key={{id}}>
          <li>{{lastRecordTimeStamp}}</li>
          </ul>`,
        }}
      />
    </amp-list>

    <amp-list
      layout="fixed-height"
      height="100"
      src={endpoint}
      items="records"
      binding="no"
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

AmpMostRead.propTypes = {
  endpoint: string.isRequired,
};

export default AmpMostRead;
