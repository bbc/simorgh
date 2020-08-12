import React, { useContext } from 'react';
import { oneOf, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import AmpAd from './Amp';
import CanonicalAd from './Canonical';

const AdContainer = ({ slotType, className }) => {
  const { isAmp } = useContext(RequestContext);
  const { ads } = useContext(ServiceContext);
  const hasAds = pathOr(false, ['hasAds'], ads);
  const { enabled: adsEnabled } = useToggle('ads');

  if (!hasAds || !adsEnabled) {
    return null;
  }

  const Ad = isAmp ? AmpAd : CanonicalAd;
  return <Ad slotType={slotType} className={className} />;
};

AdContainer.propTypes = {
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
  className: string,
};

AdContainer.defaultProps = {
  className: null,
};

export default AdContainer;
