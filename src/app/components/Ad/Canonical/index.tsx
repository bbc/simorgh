/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { pathOr } from 'rambda';
import useLocation from '#hooks/useLocation';
import isLive from '../../../lib/utilities/isLive';
import useOperaMiniDetection from '../../../hooks/useOperaMiniDetection';
import { ServiceContext } from '../../../contexts/ServiceContext';
import getAdsAriaLabel from '../utilities/getAdsAriaLabel';
import adStyles from '../utilities/adSlot.styles';
import styles from './index.styles';
import { AdProps, SLOT_TYPES } from '../types';

const { LEADERBOARD } = SLOT_TYPES;

export const getBootstrapSrc = (queryString: string, useLegacy = false) => {
  const adsTestScript =
    'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap.js';
  const adsLegacyTestScript =
    'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap-legacy.js';
  const adsLiveScript =
    'https://gn-web-assets.api.bbc.com/ngas/latest/dotcom-bootstrap.js';
  const adsLegacyLiveScript =
    'https://gn-web-assets.api.bbc.com/ngas/latest/dotcom-bootstrap-legacy.js';

  const useLiveSrc =
    (isLive() && !queryString.includes('ads-test=true')) ||
    queryString.includes('ads-js-env=live');

  if (useLiveSrc) {
    return useLegacy ? adsLegacyLiveScript : adsLiveScript;
  }
  return useLegacy ? adsLegacyTestScript : adsTestScript;
};

const CanonicalAd = ({ slotType, className }: AdProps) => {
  const location = useLocation();
  const queryString = location.search;
  const { translations, dir } = useContext(ServiceContext);
  const label = pathOr(
    'Advertisement',
    ['ads', 'advertisementLabel'],
    translations,
  );
  const ariaLabel = getAdsAriaLabel({ label, dir, slotType });

  useEffect(() => {
    if (window.dotcom && location.href != null) {
      // @ts-expect-error  dotcom is added to the window object by BBC Ads script
      window.dotcom.cmd.push(() => {
        // @ts-expect-error  dotcom is added to the window object by BBC Ads script
        window.dotcom.ads.registerSlot(slotType);
      });
    }

    return () => {
      if (window.dotcom) {
        // @ts-expect-error  dotcom is added to the window object by BBC Ads script
        window.dotcom.cmd.push(() => {
          // @ts-expect-error  dotcom is added to the window object by BBC Ads script
          window.dotcom.ads.destroySlot(slotType);
        });
      }
    };
  }, [slotType, location]);

  const isOperaMini = useOperaMiniDetection();
  if (isOperaMini) {
    return null;
  }

  return (
    <>
      <Helmet>
        {/* Add Ad scripts to document head */}
        <script type="module" src={getBootstrapSrc(queryString)} async />
        <script noModule src={getBootstrapSrc(queryString, true)} async />
      </Helmet>

      <section
        css={[
          styles.section,
          slotType === LEADERBOARD ? adStyles.leaderboard : adStyles.mpu,
        ]}
        aria-label={ariaLabel}
        aria-hidden="true"
        role="region"
        data-e2e="advertisement"
        className={className}
      >
        <div id={`dotcom-${slotType}`} className="dotcom-ad" />
      </section>
    </>
  );
};

export default CanonicalAd;
