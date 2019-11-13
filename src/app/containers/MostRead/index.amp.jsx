import React from 'react';
import Helmet from 'react-helmet';

const Amp = () => (
  <>
    <Helmet>
      <script async src="https://cdn.ampproject.org/v0.js"></script>

      <script
        async
        custom-element="amp-list"
        src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
      ></script>

      <script
        async
        custom-template="amp-mustache"
        src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
      ></script>

      <script
        async
        custom-element="amp-bind"
        src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
      ></script>
    </Helmet>

    <amp-list
      layout="fixed-height"
      height="100"
      src="https://amp.dev/static/samples/json/examples.json"
      binding="no"
    >
      <template type="amp-mustache">
        <div>
          <a href="{{url}}">{{ title }}</a>
        </div>
      </template>
    </amp-list>
  </>
);
export default Amp;
