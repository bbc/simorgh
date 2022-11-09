import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { oneOf, string } from 'prop-types';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import isLive from '#lib/utilities/isLive';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import { C_GREY_3 } from '#psammead/psammead-styles/src/colours';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import getAdsAriaLabel from '../utilities/getAdsAriaLabel';
import { leaderboardStyles, mpuStyles } from '../utilities/adSlotStyles';

const AdContainer = styled.section`
  background-color: ${C_GREY_3};
  ${({ slotType }) => (slotType === 'mpu' ? mpuStyles : leaderboardStyles)}
`;

export const getBootstrapSrc = (queryString, useLegacy = false) => {
  const adsTestScript =
    'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap.js';
  const adsLegacyTestScript =
    'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap-legacy.js';
  const adsLiveScript =
    'https://gn-web-assets.api.bbc.com/ngas/latest/dotcom-bootstrap.js';
  const adsLegacyLiveScript =
    'https://gn-web-assets.api.bbc.com/ngas/latest/dotcom-bootstrap-legacy.js';

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
        {/* Add Ad scripts to document head */}
        <script type="module" src={getBootstrapSrc(queryString)} async />
        <script
          nomodule="nomodule"
          src={getBootstrapSrc(queryString, true)}
          async
        />
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
