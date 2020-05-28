import React from 'react';
import { Helmet } from 'react-helmet';
import AdSlot from './AdSlot';

const CanonicalAd = () => (
  <>
    <Helmet>
      <script src="https://gn-web-assets.api.bbc.com/ngas/test/dotcom-bootstrap.js" />
    </Helmet>
    <AdSlot uniqueId="leaderboard" />
  </>
);

export default CanonicalAd;
