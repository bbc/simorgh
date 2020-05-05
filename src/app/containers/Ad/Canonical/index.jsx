/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import useToggle from '#hooks/useToggle';

const StyledAd = styled.div`
  /* To centre page layout for Group 4+ */
  margin: 0 auto ${GEL_SPACING_TRPL};
  width: 100%; /* Needed for IE11 */
  text-align: center;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const AdSlot = ({ type }) => {
  const location = useLocation();
  useEffect(() => {
    window.dotcom.cmd.push(() => {
      window.dotcom.ads.registerSlot(type);
    });
  }, [location, type]);

  return <div id={`dotcom-${type}`} className="dotcom-ad" />;
};

const CanonicalAd = () => {
  useEffect(() => {
    window.dotcom.bootstrap({
      pageAds: true,
      playerAds: false,
    });
  }, []);

  // const { enabled: adsEnabled } = useToggle('ads');

  // if (!adsEnabled) {
  //   // return null;
  // }

  return (
    <>
      <AdSlot type="leaderboard" />
    </>
  );
};

export default CanonicalAd;
