import React from 'react';
import { Helmet } from 'react-helmet';

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
  <div>
    <Helmet htmlAttributes={{ amp: '' }}>
      {AMP_LIST}
      {AMP_MUSTACHE}
      {AMP_BIND}
    </Helmet>
    <amp-list
      layout="fixed-height"
      height="100"
      src="https://amp.dev/static/samples/json/examples.json"
      binding="no"
    >
      <template
        type="amp-mustache"
        dangerouslySetInnerHTML={{
          __html: `<div><a href="{{url}}">{{title}}</a></div>`,
        }}
      />
    </amp-list>
  </div>
);

export default AMPMostRead;
