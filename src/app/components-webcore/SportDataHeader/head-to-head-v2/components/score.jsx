import styles from './index.styles';

const MATCH_STATUS_LETTERS = {
  Postponed: 'P',
  Cancelled: 'C',
};

const Score = ({
  status,
  home,
  homeScoreUnconfirmed,
  away,
  awayScoreUnconfirmed,
}) => {
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
