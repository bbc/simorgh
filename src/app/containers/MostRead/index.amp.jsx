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

const AMPMostRead = ({ endpoint }) => (
  <>
    <Helmet htmlAttributes={{ amp: '' }}>
      {AMP_LIST}
      {AMP_MUSTACHE}
      {AMP_BIND}
    </Helmet>
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

AMPMostRead.propTypes = {
  endpoint: string.isRequired,
};

export default AMPMostRead;
