import styles from '../index.styles';
import type { EventStatusType } from '../types';

const MATCH_STATUS_LETTERS: Record<string, string> = {
  Postponed: 'P',
  Cancelled: 'C',
};

interface ScoreProps {
  status: EventStatusType;
  home?: string;
  homeScoreUnconfirmed?: string;
  away?: string;
  awayScoreUnconfirmed?: string;
}

const Score = ({
  status,
  home,
  homeScoreUnconfirmed,
  away,
  awayScoreUnconfirmed,
}: ScoreProps) => {
  const matchStatusLetter = MATCH_STATUS_LETTERS[status];
  const homeScore = homeScoreUnconfirmed || home;
  const awayScore = awayScoreUnconfirmed || away;

  return (
    <div css={styles.score} data-testid="score" aria-hidden="true">
      <div css={styles.homeScore}>{matchStatusLetter || homeScore}</div>
      <div css={styles.verticalLine} />
      <div css={styles.awayScore}>{matchStatusLetter || awayScore}</div>
    </div>
  );
};

export default Score;
