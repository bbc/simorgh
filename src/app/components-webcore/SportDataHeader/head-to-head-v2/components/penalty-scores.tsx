// import React from 'react';
// import styled, { css } from '@bbc/web-styled';

interface RunningScores {
  penaltyShootout?: string;
}

interface TeamData {
  fullName: string;
  runningScores?: RunningScores;
}

interface PenaltyScoresData {
  home: TeamData;
  away: TeamData;
  winner?: string;
  seriesWinner?: string;
  multiLeg?: { leg: number };
  status?: string;
}

interface PenaltyScoresProps {
  data: PenaltyScoresData;
  isConciseView?: boolean;
}

const PenaltyScores = ({ data }: PenaltyScoresProps) => {
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
