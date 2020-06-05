import React from 'react';
import { Helmet } from 'react-helmet';
import AdSlot from './AdSlot';

const CanonicalAd = () => (
  <>
    {/* Loading dotcom-bootstrap.js here instead of CanonicalAdBootstrapJs to avoid it loading on live */}
    {/* This can be moved once we allow the script to load on live */}
    <Helmet>
      <script src="https://gn-web-assets.api.bbc.com/ngas/test/dotcom-bootstrap.js" />
    </Helmet>
    <AdSlot uniqueId="leaderboard" />
  </>
);

export default CanonicalAd;
