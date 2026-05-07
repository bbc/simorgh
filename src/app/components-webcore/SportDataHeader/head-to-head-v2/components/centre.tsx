import {
  isCalledOffStatus,
  isInProgressStatus,
  isResultStatus,
} from '../helpers/event-status-groups';

import Time from './fixture-time';
import Score from './score';
import styles from './index.styles';
import type { EventStatus } from '../types';

interface TimeData {
  displayTimeUK: string;
  accessibleTime: string;
}

interface TeamData {
  score?: string;
  scoreUnconfirmed?: string;
}

interface CentreData {
  status: EventStatus;
  home: TeamData;
  away: TeamData;
  time: TimeData;
}

export const shouldShowScores = (statusGroup: EventStatus) =>
  isInProgressStatus(statusGroup) ||
  isResultStatus(statusGroup) ||
  isCalledOffStatus(statusGroup) ||
  statusGroup === 'Postponed';

interface PlayedProps {
  data: CentreData;
  isConciseView: boolean;
}

const Played = ({ data, isConciseView }: PlayedProps) => (
  <Score
    status={data.status}
    home={data.home.score}
    homeScoreUnconfirmed={data.home.scoreUnconfirmed}
    away={data.away.score}
    awayScoreUnconfirmed={data.away.scoreUnconfirmed}
    isConciseView={isConciseView}
  />
);

interface CentreProps {
  data: CentreData;
  isConciseView: boolean;
  maxScoreLength?: number;
}

const Centre = ({ data, isConciseView, maxScoreLength }: CentreProps) => {
  const { status } = data;

  return (
    <div css={styles.centre(maxScoreLength)}>
      {shouldShowScores(status) ? (
        <Played data={data} isConciseView={isConciseView} />
      ) : (
        <Time time={data.time} isConciseView={isConciseView} />
      )}
    </div>
  );
};

export default Centre;
