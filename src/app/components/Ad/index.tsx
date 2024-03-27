import React, { useContext } from 'react';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import AmpAd from './Amp';
import CanonicalAd from './Canonical';
import { AdProps } from './types';
import AdBootstrapJs from './Canonical/AdBootstrapJs';

const AdContainer = ({ slotType, className, adcampaign }: AdProps) => {
  const { isAmp, showAdsBasedOnLocation } = useContext(RequestContext);
  const { enabled: adsEnabled } = useToggle('ads');

  // Ads component will only be displayed if ads toggle is true and if showAdsBasedOnLocation is true
  if ([adsEnabled, showAdsBasedOnLocation].every(Boolean)) {
    const Ad = isAmp ? AmpAd : CanonicalAd;

    return (
      <>
        {/* dotcom and dotcomConfig need to be setup before the main dotcom javascript file is loaded */}
        {!isAmp && <AdBootstrapJs adcampaign={adcampaign} />}
        <Ad slotType={slotType} className={className} />
      </>
    );
  }
  return null;
};

export default AdContainer;
