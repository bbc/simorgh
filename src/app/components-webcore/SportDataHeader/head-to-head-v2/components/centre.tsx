import {
  isCalledOffStatus,
  isInProgressStatus,
  isResultStatus,
} from '../helpers/event-status-groups';

import Time from './fixture-time';
import Score from './score';
import styles from './index.styles';
import type { HeadToHeadV2Data, EventStatusType } from '../types';

export const shouldShowScores = (statusGroup: EventStatusType) =>
  isInProgressStatus(statusGroup) ||
  isResultStatus(statusGroup) ||
  isCalledOffStatus(statusGroup) ||
  statusGroup === 'Postponed';

interface PlayedProps {
  data: HeadToHeadV2Data;
}

const Played = ({ data }: PlayedProps) => (
  <Score
    status={data.status}
    home={data.home.score}
    homeScoreUnconfirmed={data.home.scoreUnconfirmed}
    away={data.away.score}
    awayScoreUnconfirmed={data.away.scoreUnconfirmed}
  />
);

interface CentreProps {
  data: HeadToHeadV2Data;
  maxScoreLength?: number;
}

const Centre = ({ data, maxScoreLength }: CentreProps) => {
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
