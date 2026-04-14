import React from 'react';
import styled, { css } from '@bbc/web-styled';
import {
  GROUP_3,
  SPACING_1,
  SPACING_2,
  fontEmphasised,
  fontScaleBody,
  fontScaleDescription
} from '@bbc/web-gel-foundations';
import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';

const PenaltyScoresContainer = styled.div`
  ${fontScaleBody}
  text-align: center;
  padding: ${SPACING_1} 0;

  @media (min-width: ${GROUP_3}) {
    padding-bottom: ${SPACING_2};
  }

  ${({ isConciseView }) =>
    isConciseView &&
    css`
      ${fontScaleDescription}
    `}
`;

const WinningTeamName = styled.span`
  ${fontEmphasised}
  color: ${({ theme, isConciseView }) => (isConciseView ? theme.colourPalette.primary : theme.colourPalette.accent)};
`;

const PenaltiesText = styled.div`
  color: ${({ theme }) => theme.colourPalette.secondary};
`;

const PenaltyScores = ({ data, isConciseView }) => {
  const { winner, seriesWinner, multiLeg, status } = data;

  const isPostEvent = status?.toLowerCase() === 'postevent';
  const hasWinner = winner !== undefined;
  const isDrawWithNoSeriesWinner = winner === 'draw' && !seriesWinner;
  const isMultiLegWithNoSeriesWinner = multiLeg?.leg > 1 && !seriesWinner;

  if (!isPostEvent || !hasWinner || isDrawWithNoSeriesWinner || isMultiLegWithNoSeriesWinner) {
    return null;
  }

  const winnerOnPenalties = seriesWinner ?? winner;
  const loserOnPenalties = winnerOnPenalties.toLowerCase() === 'home' ? 'away' : 'home';
  const winnerOnPenaltiesName = data[winnerOnPenalties].fullName;
  const winnerOnPenaltiesScore = data[winnerOnPenalties].runningScores.penaltyShootout;
  const loserOnPenaltiesScore = data[loserOnPenalties].runningScores.penaltyShootout;

  return (
    <PenaltyScoresContainer isConciseView={isConciseView}>
      <VisuallyHidden>
        {`${winnerOnPenaltiesName} win ${winnerOnPenaltiesScore} - ${loserOnPenaltiesScore} on penalties`}
      </VisuallyHidden>
      <PenaltiesText aria-hidden="true" data-testid="penalties-text">
        <WinningTeamName isConciseView={isConciseView}>{`${winnerOnPenaltiesName}`}</WinningTeamName>
        {` win ${winnerOnPenaltiesScore}-${loserOnPenaltiesScore} on pens`}
      </PenaltiesText>
    </PenaltyScoresContainer>
  );
};

export default PenaltyScores;
