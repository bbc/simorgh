import { useEffect, useState } from 'react';
import { Services } from '#app/models/types/global';
import { isLiveStatus } from '../helpers/event-status-groups';
import { getLocalisedDate } from '../helpers/localise-datetime';
import styles from '../index.styles';
import type { EventStatusType } from '../types';

interface TimeData {
  displayTimeUK: string;
  accessibleTime: string;
}
interface HeadToHeadHeaderProps {
  date: string;
  time: TimeData;
  tournament?: string;
  stage?: string;
  status: EventStatusType;
  period?: string;
  service: Services;
}

const HeadToHeadHeader = ({
  date,
  time,
  tournament,
  stage,
  status,
  service,
}: HeadToHeadHeaderProps) => {
  const [localisedDate, setLocalisedDate] = useState(date);

  useEffect(() => {
    const clientDate = getLocalisedDate(date, time.displayTimeUK, service);
    setLocalisedDate(clientDate);
  }, [date, time.displayTimeUK, service]);

  return (
    <div css={styles.headerWrapper(isLiveStatus(status))}>
      {!isLiveStatus(status) && (
        <div css={styles.dateWrapper}>
          <div css={styles.dateHeader}>
            <time css={styles.date}>{localisedDate}</time>
          </div>
          <div css={styles.interpunct} aria-hidden>
            ‧
          </div>
        </div>
      )}
      <div css={styles.tournamentHeader}>
        {tournament && (
          <div css={styles.competitionFormatter}>{tournament}</div>
        )}
        {stage && <div css={styles.competitionFormatter}> - {stage}</div>}
      </div>
    </div>
  );
};

export default HeadToHeadHeader;
