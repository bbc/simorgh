import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdSlot from './AdSlot';

const CanonicalAd = () => {
  useEffect(() => {
    if (window.dotcom.bootstrap) {
      window.dotcom.bootstrap({
        pageAds: true,
        playerAds: false,
      });
    }
  });

  return (
    <>
      <Helmet>
        <script src="https://gn-web-assets.api.bbc.com/ngas/beta/dotcom-bootstrap.js" />
      </Helmet>
      <AdSlot uniqueId="leaderboard" />
    </>
  );
};

export default CanonicalAd;
