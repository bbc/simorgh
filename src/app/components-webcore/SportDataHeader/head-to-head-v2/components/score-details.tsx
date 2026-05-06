// import React from 'react';
// import styled from '@bbc/web-styled';
import styled from '@emotion/styled';

// import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';

import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

// import {
//   fontScaleDescription,
//   SPACING_1,
//   GROUP_3,
//   SPACING_2,
//   SPACING_3,
// } from '@bbc/web-gel-foundations';
import { GRID_AREAS } from './action-grid';

import pixelsToRem from '../../../../utilities/pixelsToRem';

const ScoreDetailsWrapper = styled.div`
  grid-area: ${GRID_AREAS.centreText};
  display: flex;
  row-gap: 8px;
  ${'' /* ${fontScaleDescription} */}
  font-size: 14px;
  line-height: 1.2857142857142858;

  text-align: center;
  ${'' /* color: ${({ theme }) => theme.colourPalette.primary}; */}
  color: #F8F8F8;

  padding: 4px 0 12px;

  flex-direction: row;
  justify-content: center;
  @media (min-width: ${pixelsToRem(600)}rem) {
    padding: 4px 0 8px;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Score = styled.div`
  ${'' /* color: ${({ theme }) => theme.colourPalette.secondary}; */}
  color: #A8A8A8;
`;

const Comma = styled.span`
  ${'' /* color: ${({ theme }) => theme.colourPalette.secondary}; */}
  color: #A8A8A8;

  padding-right: 4px;
  @media (min-width: ${pixelsToRem(600)}rem) {
    display: none;
  }
`;

interface RunningScores {
  halftime?: string;
  fulltime?: string;
  extratime?: string;
}

interface ScoreDetailsProps {
  homeName: string;
  awayName: string;
  homeRunningScores?: RunningScores;
  awayRunningScores?: RunningScores;
}

const ScoreDetails = ({
  homeName,
  awayName,
  homeRunningScores,
  awayRunningScores,
}: ScoreDetailsProps) => {
  const shouldDisplayHT = Boolean(
    homeRunningScores?.halftime && awayRunningScores?.halftime,
  );
  const shouldDisplayFT = Boolean(
    homeRunningScores?.fulltime &&
    awayRunningScores?.fulltime &&
    homeRunningScores?.extratime &&
    awayRunningScores?.extratime,
  );

  if (!shouldDisplayFT && !shouldDisplayHT) {
    return null;
  }

  return (
    <ScoreDetailsWrapper>
      {shouldDisplayFT && (
        <>
          <VisuallyHiddenText>{`Full Time ${homeName} ${homeRunningScores.fulltime} , ${awayName} ${awayRunningScores.fulltime}`}</VisuallyHiddenText>

          <Score aria-hidden="true">{`FT ${homeRunningScores.fulltime}-${awayRunningScores.fulltime}`}</Score>

          <Comma>,</Comma>
        </>
      )}
      {shouldDisplayHT && (
        <>
          <VisuallyHiddenText>{`Half Time ${homeName} ${homeRunningScores.halftime} , ${awayName} ${awayRunningScores.halftime}`}</VisuallyHiddenText>{' '}
          <Score aria-hidden="true">{`HT ${homeRunningScores.halftime}-${awayRunningScores.halftime}`}</Score>
        </>
      )}
    </ScoreDetailsWrapper>
  );
};

export default ScoreDetails;
