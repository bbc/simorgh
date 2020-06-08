import React from 'react';
import AdSlot from './AdSlot';
import CanonicalAdBootstrap from './CanonicalAdBootstrapJs';

const CanonicalAd = () => (
  <>
    <CanonicalAdBootstrap />
    <AdSlot uniqueId="leaderboard" />
  </>
);

export default CanonicalAd;
