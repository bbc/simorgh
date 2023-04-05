/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import isLive from '#lib/utilities/isLive';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import { ServiceContext } from '../../../contexts/ServiceContext';
import getAdsAriaLabel from '../utilities/getAdsAriaLabel';
import { AdProps, WindowWithDotCom } from '../types';
import styles from './index.styles';

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const windowWithDotCom: WindowWithDotCom = window.dotcom;

    if (windowWithDotCom) {
      windowWithDotCom.cmd.push(() => {
        windowWithDotCom.ads.registerSlot(slotType);
      });
    }

    return () => {
      if (windowWithDotCom) {
        windowWithDotCom.cmd.push(() => {
          windowWithDotCom.ads.destroySlot(slotType);
        });
      }
    };
  }, [slotType, location]);

  const isOperaMini = useOperaMiniDetection();
  if (!showAdsBasedOnLocation || isOperaMini) {
    return null;
  }

  return (
    <React.Fragment>
      <Helmet>
        {/* Add Ad scripts to document head */}
        <script type="module" src={getBootstrapSrc(queryString)} async />
        <script noModule src={getBootstrapSrc(queryString, true)} async />
      </Helmet>

      <section
        css={slotType === 'mpu' ? styles.mpu : styles.leaderboard}
        aria-label={ariaLabel}
        aria-hidden="true"
        role="region"
        data-e2e="advertisement"
        className={className}
      >
        <div id={`dotcom-${slotType}`} className="dotcom-ad" />
      </section>
    </React.Fragment>
  );
};

export default CanonicalAd;
