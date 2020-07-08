import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { oneOf } from 'prop-types';
import styled from 'styled-components';
import { C_LUNAR_LIGHT } from '@bbc/psammead-styles/colours';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import isLive from '#lib/utilities/isLive';
import AdSlot from './AdSlot';

const LEADERBOARD_HEIGHT = '5.5rem';
const LEADERBOARD_HEIGHT_GROUP_4_5 = '9rem';

const StyledAdSection = styled.section.attrs({
  ariaHidden: 'true',
  role: 'region',
  ariaLabel: 'advertisement',
})`
  background-color: ${C_LUNAR_LIGHT};
  min-height: ${LEADERBOARD_HEIGHT};

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    min-height: ${LEADERBOARD_HEIGHT_GROUP_4_5};
  }
`;

export const getBootsrapSrc = queryString => {
  const useLiveSrc = isLive() || queryString.includes('ads-js-env=live');
  const params = useLiveSrc ? '' : 'test/';
  return `https://gn-web-assets.api.bbc.com/ngas/${params}dotcom-bootstrap.js`;
};

const CanonicalAd = ({ slotType }) => {
  const location = useLocation();
  const queryString = location.search;

  return (
    <>
      {/* Loading dotcom-bootstrap.js here instead of CanonicalAdBootstrapJs to avoid it loading on live */}
      {/* This can be moved once we allow the script to load on live */}
      <StyledAdSection>
        <Helmet>
          <script src={getBootsrapSrc(queryString)} />
        </Helmet>
        <AdSlot uniqueId={slotType} />
      </StyledAdSection>
    </>
  );
};

CanonicalAd.propTypes = {
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
};

export default CanonicalAd;
