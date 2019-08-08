import React from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';

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
        sandbox="allow-scripts allow-same-origin"
        layout="fill"
        frameborder="0"
        src={embedSource}
      >
        <amp-img
          layout="fill"
          src="https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg"
          placeholder
        />
      </amp-iframe>
    </React.Fragment>
  );
};

Amp.propTypes = {
  embedSource: string.isRequired,
};

export default Amp;
