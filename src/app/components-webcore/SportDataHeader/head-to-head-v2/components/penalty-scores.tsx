import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from './index.styles';
import type { RunningScores } from './actions';

type Winner = 'home' | 'away' | 'draw';

interface TeamData {
  fullName: string;
  runningScores?: RunningScores;
}

interface PenaltyScoresData {
  status?: string;
  winner?: Winner;
  seriesWinner?: 'home' | 'away';
  multiLeg?: { leg: number };
  home: TeamData;
  away: TeamData;
}

interface PenaltyScoresProps {
  data: PenaltyScoresData;
  isConciseView?: boolean;
}

const PenaltyScores = ({ data, isConciseView: _isConciseView }: PenaltyScoresProps) => {
  const { winner, seriesWinner, multiLeg, status } = data;

  const isPostEvent = status?.toLowerCase() === 'postevent';
  const hasWinner = winner !== undefined;
  const isDrawWithNoSeriesWinner = winner === 'draw' && !seriesWinner;
  const isMultiLegWithNoSeriesWinner = multiLeg?.leg && multiLeg.leg > 1 && !seriesWinner;

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
    (winnerOnPenalties as string).toLowerCase() === 'home' ? 'away' : 'home';
  const winnerOnPenaltiesName = data[winnerOnPenalties as 'home' | 'away'].fullName;
  const winnerOnPenaltiesScore =
    data[winnerOnPenalties as 'home' | 'away'].runningScores?.penaltyShootout;
  const loserOnPenaltiesScore =
    data[loserOnPenalties as 'home' | 'away'].runningScores?.penaltyShootout;

  return (
    <div css={styles.penaltyScoresContainer()}>
      <VisuallyHiddenText>
        {`${winnerOnPenaltiesName} win ${winnerOnPenaltiesScore} - ${loserOnPenaltiesScore} on penalties`}
      </VisuallyHiddenText>
      <div
        css={styles.penaltiesText()}
        aria-hidden="true"
        data-testid="penalties-text"
      >
        <span css={styles.winningTeamName()}>{`${winnerOnPenaltiesName}`}</span>
        {` win ${winnerOnPenaltiesScore}-${loserOnPenaltiesScore} on pens`}
      </div>
    </div>
  );
};

export default PenaltyScores;
