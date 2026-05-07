import styles from './index.styles';
import type { EventStatus } from '../types';

const MATCH_STATUS_LETTERS: Record<string, string> = {
  Postponed: 'P',
  Cancelled: 'C',
};

interface ScoreProps {
  status: EventStatus;
  home?: string;
  homeScoreUnconfirmed?: string;
  away?: string;
  awayScoreUnconfirmed?: string;
  isConciseView?: boolean;
}

const Score = ({
  status,
  home,
  homeScoreUnconfirmed,
  away,
  awayScoreUnconfirmed,
  isConciseView: _isConciseView,
}: ScoreProps) => {
  const matchStatusLetter = MATCH_STATUS_LETTERS[status];
  const homeScore = homeScoreUnconfirmed || home;
  const awayScore = awayScoreUnconfirmed || away;

  return (
    <div css={styles.score()} data-testid="score" aria-hidden="true">
      <div css={styles.homeScore()}>{matchStatusLetter || homeScore}</div>
      <div css={styles.verticalLine()} />
      <div css={styles.awayScore()}>{matchStatusLetter || awayScore}</div>
    </div>
  );
};

export default Score;

interface VerticalLineProps {
  children?: React.ReactNode;
}

export const VerticalLine = ({ children }: VerticalLineProps) => (
  <div css={styles.verticalLine()}>{children}</div>
);
