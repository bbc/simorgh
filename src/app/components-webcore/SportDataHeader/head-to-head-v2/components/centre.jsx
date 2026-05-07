import {
  isCalledOffStatus,
  isInProgressStatus,
  isResultStatus,
} from '../helpers/event-status-groups';

import Time from './fixture-time';
import Score from './score';
import styles from './index.styles';

export const shouldShowScores = statusGroup =>
  isInProgressStatus(statusGroup) ||
  isResultStatus(statusGroup) ||
  isCalledOffStatus(statusGroup) ||
  statusGroup === 'Postponed';

const Played = ({ data }) => (
  <Score
    status={data.status}
    home={data.home.score}
    homeScoreUnconfirmed={data.home.scoreUnconfirmed}
    away={data.away.score}
    awayScoreUnconfirmed={data.away.scoreUnconfirmed}
  />
);

const Centre = ({ data, maxScoreLength }) => {
  const { status } = data;

  return (
    <div css={styles.centre(maxScoreLength)}>
      {shouldShowScores(status) ? (
        <Played data={data} />
      ) : (
        <Time time={data.time} />
      )}
    </div>
  );
};

export default Centre;
