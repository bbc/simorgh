import React from 'react';
import styled from '@bbc/web-styled';
import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';
import { fontScaleDescription, SPACING_1, GROUP_3, SPACING_2, SPACING_3 } from '@bbc/web-gel-foundations';
import { GRID_AREAS } from './action-grid.jsx';

const ScoreDetailsWrapper = styled.div`
  grid-area: ${GRID_AREAS.centreText};
  display: flex;
  row-gap: ${SPACING_2};
  ${fontScaleDescription}
  text-align: center;
  color: ${({ theme }) => theme.colourPalette.primary};
  padding: ${SPACING_1} 0 ${SPACING_3};

  flex-direction: row;
  justify-content: center;
  @media (min-width: ${GROUP_3}) {
    padding: ${SPACING_1} 0 ${SPACING_2};
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Score = styled.div`
  color: ${({ theme }) => theme.colourPalette.secondary};
`;

const Comma = styled.span`
  color: ${({ theme }) => theme.colourPalette.secondary};

  padding-right: ${SPACING_1};
  @media (min-width: ${GROUP_3}) {
    display: none;
  }
`;

const ScoreDetails = ({ homeName, awayName, homeRunningScores, awayRunningScores }) => {
  const shouldDisplayHT = Boolean(homeRunningScores?.halftime && awayRunningScores?.halftime);
  const shouldDisplayFT = Boolean(
    homeRunningScores?.fulltime &&
    awayRunningScores?.fulltime &&
    homeRunningScores?.extratime &&
    awayRunningScores?.extratime
  );

  if (!shouldDisplayFT && !shouldDisplayHT) {
    return null;
  }

  return (
    <ScoreDetailsWrapper>
      {shouldDisplayFT && (
        <>
          <VisuallyHidden>{`Full Time ${homeName} ${homeRunningScores.fulltime} , ${awayName} ${awayRunningScores.fulltime}`}</VisuallyHidden>

          <Score aria-hidden="true">{`FT ${homeRunningScores.fulltime}-${awayRunningScores.fulltime}`}</Score>

          <Comma>,</Comma>
        </>
      )}
      {shouldDisplayHT && (
        <>
          <VisuallyHidden>{`Half Time ${homeName} ${homeRunningScores.halftime} , ${awayName} ${awayRunningScores.halftime}`}</VisuallyHidden>{' '}
          <Score aria-hidden="true">{`HT ${homeRunningScores.halftime}-${awayRunningScores.halftime}`}</Score>
        </>
      )}
    </ScoreDetailsWrapper>
  );
};

export default ScoreDetails;
