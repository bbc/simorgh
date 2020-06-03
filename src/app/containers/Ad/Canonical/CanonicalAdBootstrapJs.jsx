import React from 'react';
import { Helmet } from 'react-helmet';

const CanonicalAdBootstrapJs = () => (
  <>
    <Helmet
      script={[
        {
          type: 'text/javascript',
          // Once the Ad script has loaded, ads pushed to `cmd` are rendered
          innerHTML: `
            document.cookie = 'ads-debug=true';
            window.dotcom = window.dotcom || { cmd: [] };
            window.dotcomConfig = {
              pageAds: true,
              playerAds: false,
            };
          `,
        },
      ]}
    />
    <Helmet>
      <script src="https://gn-web-assets.api.bbc.com/ngas/test/dotcom-bootstrap.js" />
    </Helmet>
  </>
);

export default CanonicalAdBootstrapJs;
