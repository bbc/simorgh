import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { oneOf, string } from 'prop-types';
import styled from 'styled-components';
import { C_LUNAR_LIGHT } from '@bbc/psammead-styles/colours';
import pathOr from 'ramda/src/pathOr';
import { leaderboardStyles, mpuStyles } from '../utilities/adSlotStyles';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import isLive from '#lib/utilities/isLive';
import getAdsAriaLabel from '../utilities/getAdsAriaLabel';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';

const AdContainer = styled.section`
  background-color: ${C_LUNAR_LIGHT};
  ${({ slotType }) => (slotType === 'mpu' ? mpuStyles : leaderboardStyles)}
`;

export const getBootstrapSrc = (queryString, useLegacy = false) => {
  const adsTestScript =
    'https://gn-web-assets.api.bbc.com/ngas/test/dotcom-bootstrap.js';
  const adsLegacyTestScript =
    'https://gn-web-assets.api.bbc.com/ngas/test/dotcom-bootstrap-legacy.js';
  const adsLiveScript =
    'https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap.js';
  const adsLegacyLiveScript =
    'https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap-legacy.js';
  const useLiveSrc = isLive() || queryString.includes('ads-js-env=live');
  if (useLiveSrc) {
    return useLegacy ? adsLegacyLiveScript : adsLiveScript;
  }
  return useLegacy ? adsLegacyTestScript : adsTestScript;
};

const CanonicalAd = ({ slotType, className }) => {
  const { showAdsBasedOnLocation } = useContext(RequestContext);
  const location = useLocation();
  const queryString = location.search;
  const { translations, dir } = useContext(ServiceContext);
  const label = pathOr(
    'Advertisement',
    ['ads', 'advertisementLabel'],
    translations,
  );
  const ariaLabel = getAdsAriaLabel(label, dir, slotType);

  useEffect(() => {
    if (window.dotcom) {
      window.dotcom.cmd.push(() => {
        window.dotcom.ads.registerSlot(slotType);
      });
    }

    return () => {
      if (window.dotcom) {
        window.dotcom.cmd.push(() => {
          window.dotcom.ads.destroySlot(slotType);
        });
      }
    };
  }, [slotType, location]);

  const isOperaMini = useOperaMiniDetection();

  if (!showAdsBasedOnLocation || isOperaMini) {
    return null;
  }

  return (
    <>
      <Helmet>
        <script type="module" src={getBootstrapSrc(queryString)} />
        <script nomodule="nomodule" src={getBootstrapSrc(queryString, true)} />
      </Helmet>
      <AdContainer
        slotType={slotType}
        aria-label={ariaLabel}
        aria-hidden="true"
        role="region"
        data-e2e="advertisement"
        className={className}
      >
        <div id={`dotcom-${slotType}`} className="dotcom-ad" />
      </AdContainer>
    </>
  );
};

CanonicalAd.propTypes = {
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
  className: string,
};

CanonicalAd.defaultProps = {
  className: null,
};

export default CanonicalAd;
