import React from 'react';
import styled from 'styled-components';
import { C_LUNAR_LIGHT } from '@bbc/psammead-styles/colours';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import AdSlot from './AdSlot';
import CanonicalAdBootstrap from './CanonicalAdBootstrapJs';

const LEADERBOARD_HEIGHT = '5.5rem';
const LEADERBOARD_HEIGHT_GROUP_4_5 = '9rem';

const StyledAdDiv = styled.div`
  background-color: ${C_LUNAR_LIGHT};
  min-height: ${LEADERBOARD_HEIGHT};

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    min-height: ${LEADERBOARD_HEIGHT_GROUP_4_5};
  }
`;

const CanonicalAd = () => (
  <StyledAdDiv>
    <CanonicalAdBootstrap />
    <AdSlot uniqueId="leaderboard" />
  </StyledAdDiv>
);

export default CanonicalAd;
