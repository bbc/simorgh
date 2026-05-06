/** @jsxImportSource @emotion/react */
import styles from './index.styles';

const MATCH_STATUS_LETTERS: Record<string, string> = {
  Postponed: 'P',
  Cancelled: 'C',
};

interface ScoreProps {
  status: string;
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

export const VerticalLine = ({ children }) => (
  <div css={styles.verticalLine()}>{children}</div>
);
