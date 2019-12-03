import React from 'react';
import { Helmet } from 'react-helmet';

const AmpScript = ({ scriptSrc }) => (
  <div>
    <Helmet htmlAttributes={{ amp: '' }}>
      <script
        async
        custom-element="amp-script"
        src="https://cdn.ampproject.org/v0/amp-script-0.1.js"
      />
    </Helmet>

    <amp-script
      layout="container"
      data-ampdevmode="tue" // bypasses amp checks such as is on https and js size
      sandbox="allow-forms" // allows form input like buttons
      src={`http://localhost:7080/amp-script/${scriptSrc}`}
    >
      {/* Root Div for react app to render into */}
      <div id="root"></div>
    </amp-script>
  </div>
);

export default AmpScript;
