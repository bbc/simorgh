// import React from 'react';
// import styled, { css } from '@bbc/web-styled';

import styled from '@emotion/styled';
// import { css } from '@emotion/react';

// import {
//   GROUP_3,
//   SPACING_1,
//   SPACING_2,
//   fontEmphasised,
//   fontScaleBody,
//   fontScaleDescription,
// } from '@bbc/web-gel-foundations';
// import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';

// eslint-disable-next-line import/no-relative-packages
import VisuallyHiddenText from '../../../../../../../../src/app/components/VisuallyHiddenText';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../../../../../src/app/utilities/pixelsToRem';

const PenaltyScoresContainer = styled.div`
  font-size: 1rem;
  line-height: 1.375;
  text-align: center;
  padding: '4px 0';

  @media (min-width: '${pixelsToRem(600)}rem') {
    padding-bottom: '8px';
  }

  ${
    '' /* ${({ isConciseView }) =>
    isConciseView &&
    css`
      ${fontScaleDescription}
    `} */
  }
`;

const WinningTeamName = styled.span`
  ${'' /* ${fontEmphasised} */}
  font-family: 'ReithSans, Helvetica, Arial, freesans, sans-serif';
  font-weight: 700;
  font-feature-settings: 'ss01' off;
  ${
    '' /* color: ${({ theme, isConciseView }) =>
    isConciseView ? theme.colourPalette.primary : theme.colourPalette.accent}; */
  }
  color: "#FFD230";
`;

const PenaltiesText = styled.div`
  ${'' /* color: ${({ theme }) => theme.colourPalette.secondary}; */}
  color: "#A8A8A8";
`;

const PenaltyScores = ({ data, isConciseView }) => {
  const { winner, seriesWinner, multiLeg, status } = data;

  const isPostEvent = status?.toLowerCase() === 'postevent';
  const hasWinner = winner !== undefined;
  const isDrawWithNoSeriesWinner = winner === 'draw' && !seriesWinner;
  const isMultiLegWithNoSeriesWinner = multiLeg?.leg > 1 && !seriesWinner;

  if (
    !isPostEvent ||
    !hasWinner ||
    isDrawWithNoSeriesWinner ||
    isMultiLegWithNoSeriesWinner
  ) {
    return null;
  }

  const winnerOnPenalties = seriesWinner ?? winner;
  const loserOnPenalties =
    winnerOnPenalties.toLowerCase() === 'home' ? 'away' : 'home';
  const winnerOnPenaltiesName = data[winnerOnPenalties].fullName;
  const winnerOnPenaltiesScore =
    data[winnerOnPenalties].runningScores.penaltyShootout;
  const loserOnPenaltiesScore =
    data[loserOnPenalties].runningScores.penaltyShootout;

  return (
    <PenaltyScoresContainer isConciseView={isConciseView}>
      <VisuallyHiddenText>
        {`${winnerOnPenaltiesName} win ${winnerOnPenaltiesScore} - ${loserOnPenaltiesScore} on penalties`}
      </VisuallyHiddenText>
      <PenaltiesText aria-hidden="true" data-testid="penalties-text">
        <WinningTeamName
          isConciseView={isConciseView}
        >{`${winnerOnPenaltiesName}`}</WinningTeamName>
        {` win ${winnerOnPenaltiesScore}-${loserOnPenaltiesScore} on pens`}
      </PenaltiesText>
    </PenaltyScoresContainer>
  );
};

export default PenaltyScores;
