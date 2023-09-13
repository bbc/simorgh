import React from 'react';
import { Helmet } from 'react-helmet';

const AdBootstrapJs = ({ adcampaign }: { adcampaign?: string }) => {
  let innerHTML;

  if (adcampaign) {
    // Once the Ad script has loaded, ads pushed to `cmd` are rendered
    innerHTML = `
    window.dotcom = window.dotcom || { cmd: [] };
    window.dotcomConfig = {
      pageAds: true,
      playerAds: false,
      adcampaign: '${adcampaign}'
    };
    `;
  } else {
    innerHTML = `
    window.dotcom = window.dotcom || { cmd: [] };
    window.dotcomConfig = {
      pageAds: true,
      playerAds: false
    };
    `;
  }

  return (
    <Helmet
      script={[
        {
          type: 'text/javascript',
          innerHTML,
        },
      ]}
    />
  );
};

export default AdBootstrapJs;
