import React, { useContext } from 'react';
import { oneOf } from 'prop-types';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import AmpAd from './Amp';
import CanonicalAd from './Canonical';

const AdContainer = ({ slotType }) => {
  const { isAmp } = useContext(RequestContext);
  const { enabled: adsEnabled } = useToggle('ads');

  if (!adsEnabled) {
    return null;
  }

  const Ad = isAmp ? AmpAd : CanonicalAd;
  return <Ad slotType={slotType} />;
};

AdContainer.propTypes = {
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
};

export default AdContainer;
