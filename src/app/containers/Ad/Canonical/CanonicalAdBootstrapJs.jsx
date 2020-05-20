import React from 'react';
import { Helmet } from 'react-helmet';

const CanonicalAdBootstrapJs = () => (
  <Helmet
    script={[
      {
        type: 'text/javascript',
        // Once the Ad script has loaded, ads pushed to `cmd` are rendered
        innerHTML: `
            window.dotcom = window.dotcom || { cmd: [] };
            window.dotcomConfig = {
              pageAds: true,
              playerAds: false,
            };
          `,
      },
    ]}
  />
);

export default CanonicalAdBootstrapJs;
