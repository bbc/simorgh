import { isLiveStatus } from '../helpers/event-status-groups';
import styles from '../index.styles';
import type { EventStatusType } from '../types';

interface HeadToHeadHeaderProps {
  date: string;
  tournament?: string;
  stage?: string;
  status: EventStatusType;
  period?: string;
}

const HeadToHeadHeader = ({
  date,
  tournament,
  stage,
  status,
}: HeadToHeadHeaderProps) => (
  <div css={styles.headerWrapper(isLiveStatus(status))}>
    {!isLiveStatus(status) && (
      <div css={styles.dateWrapper}>
        <div css={styles.dateHeader}>
          <time css={styles.date}>{date}</time>
        </div>
        <div css={styles.interpunct} aria-hidden>
          ‧
        </div>
      </div>
    )}
    <div css={styles.tournamentHeader}>
      {tournament && <div css={styles.competitionFormatter}>{tournament}</div>}
      {stage && <div css={styles.competitionFormatter}> - {stage}</div>}
    </div>
  </div>
);

export default HeadToHeadHeader;
