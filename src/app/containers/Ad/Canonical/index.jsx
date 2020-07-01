import React from 'react';
import { oneOf } from 'prop-types';
import styled from 'styled-components';
import { C_LUNAR_LIGHT } from '@bbc/psammead-styles/colours';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { Helmet } from 'react-helmet';
import AdSlot from './AdSlot';

const LEADERBOARD_HEIGHT = '5.5rem';
const LEADERBOARD_HEIGHT_GROUP_4_5 = '9rem';

const StyledAdDiv = styled.div`
  background-color: ${C_LUNAR_LIGHT};
  min-height: ${LEADERBOARD_HEIGHT};

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    min-height: ${LEADERBOARD_HEIGHT_GROUP_4_5};
  }
`;

const CanonicalAd = ({ slotType }) => (
  <>
    {/* Loading dotcom-bootstrap.js here instead of CanonicalAdBootstrapJs to avoid it loading on live */}
    {/* This can be moved once we allow the script to load on live */}
    <StyledAdDiv>
      <Helmet>
        <script src="https://gn-web-assets.api.bbc.com/ngas/test/dotcom-bootstrap.js" />
      </Helmet>
      <AdSlot uniqueId={slotType} />
    </StyledAdDiv>
  </>
);

CanonicalAd.propTypes = {
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
};

export default CanonicalAd;
