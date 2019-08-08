import React from 'react';
import Helmet from 'react-helmet';

const AmpHead = () => {
  return (
    <Helmet>
      <script
        async
        custom-element="amp-iframe"
        src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
      />
    </Helmet>
  );
};

const Amp = ({ embedSource }) => {
  return (
    <React.Fragment>
      <AmpHead />
      <amp-iframe
        width="100%"
        height="100%"
        sandbox="allow-scripts allow-same-origin"
        layout="responsive"
        frameborder="0"
        src={embedSource}
      />
    </React.Fragment>
  );
};

export default Amp;
