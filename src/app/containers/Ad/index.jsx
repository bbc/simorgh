import React, { useContext } from 'react';
import { oneOf, string } from 'prop-types';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import AmpAd from './Amp';
import CanonicalAd from './Canonical';

const AdContainer = ({ slotType, className }) => {
  const { isAmp } = useContext(RequestContext);
  const { enabled: adsEnabled } = useToggle('ads');
  const { enabled: asyncAds } = useToggle('asyncAds'); // Temp toggle for testing async loading of the dotcom-bootstrap

  if (!adsEnabled) {
    return null;
  }

  const Ad = isAmp ? AmpAd : CanonicalAd;
  return <Ad slotType={slotType} className={className} asyncAds={asyncAds} />;
};

AdContainer.propTypes = {
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
  className: string,
};

AdContainer.defaultProps = {
  className: null,
};

export default AdContainer;
