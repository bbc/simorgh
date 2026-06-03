import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from '../index.styles';
import type { HeadToHeadV2Data } from '../types';

interface PenaltyScoresProps {
  data: HeadToHeadV2Data;
}

const PenaltyScores = ({ data }: PenaltyScoresProps) => {
  const { winner, seriesWinner, multiLeg, status } = data;

  const { translations } = use(ServiceContext);
  const { winOnPenalties } = translations?.sport || {};
  const { prefix = 'win', suffix = 'on penalties' } = winOnPenalties ?? {};
  const shortSuffix = suffix === 'on penalties' ? 'on pens' : suffix;

  const isPostEvent = status?.toLowerCase() === 'postevent';
  const hasWinner = winner !== undefined;
  const isDrawWithNoSeriesWinner = winner === 'draw' && !seriesWinner;
  const isMultiLegWithNoSeriesWinner =
    multiLeg?.leg && multiLeg.leg > 1 && !seriesWinner;

  if (
    !isPostEvent ||
    !hasWinner ||
    isDrawWithNoSeriesWinner ||
    isMultiLegWithNoSeriesWinner
  ) {
    return null;
  }

  const winnerOnPenalties = seriesWinner ?? winner;
  const loserOnPenalties = winnerOnPenalties === 'home' ? 'away' : 'home';
  const winnerOnPenaltiesName =
    data[winnerOnPenalties as 'home' | 'away'].fullName;
  const winnerOnPenaltiesScore =
    data[winnerOnPenalties as 'home' | 'away'].runningScores?.penaltyShootout;
  const loserOnPenaltiesScore =
    data[loserOnPenalties].runningScores?.penaltyShootout;

  return (
    <div css={styles.penaltyScoresContainer}>
      <VisuallyHiddenText>
        {`${winnerOnPenaltiesName} ${prefix} ${winnerOnPenaltiesScore} - ${loserOnPenaltiesScore} ${suffix}`}
      </VisuallyHiddenText>
      <div
        css={styles.penaltiesText}
        aria-hidden="true"
        data-testid="penalties-text"
      >
        <span css={styles.winningTeamName}>{`${winnerOnPenaltiesName}`}</span>
        {` ${prefix} ${winnerOnPenaltiesScore}-${loserOnPenaltiesScore} ${shortSuffix}`}
      </div>
    </div>
  );
};

export default PenaltyScores;
