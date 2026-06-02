import dynamic from 'next/dynamic';

import {
  isCalledOffStatus,
  isInProgressStatus,
  isResultStatus,
} from '../helpers/event-status-groups';

import Score from './score';
import styles from '../index.styles';
import type { HeadToHeadV2Data, EventStatusType } from '../types';
import getLocalisedDate from '../helpers/get-localised-date';

// Required as the .toLocaleTimeString() JS is called client-side which causes hydration errors
const Time = dynamic(() => import('./fixture-time'), { ssr: false });

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
  const { status, date, time } = data;

  const localisedTime = getLocalisedDate(date, time.displayTimeUK);
  const newTimeObject = {
    displayTimeUK: localisedTime,
    accessibleTime: localisedTime,
  };

  console.log(date, time.displayTimeUK, 'original time in data');
  console.log(localisedTime, 'localised time');

  return (
    <div css={styles.centre(maxScoreLength)}>
      {shouldShowScores(status) ? (
        // Removed for testing
        <Time time={newTimeObject || time} />
      ) : (
        <Played data={data} />
      )}
    </div>
  );
};

export default Centre;
