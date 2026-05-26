import { isLiveStatus } from '../helpers/event-status-groups';
import styles from '../index.styles';
import type { EventStatusType } from '../types';

const formatTournamentDescriptionLabel = (
  tournamentDescriptionLabel: string,
) => {
  const tournamentGroupsArray = tournamentDescriptionLabel.split(' - ');

  return tournamentGroupsArray.map((element, i) => {
    if (tournamentGroupsArray.length === i + 1) {
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: we want this
        <div css={styles.competitionFormatter} key={`tournament_part_${i}`}>
          {element}
        </div>
      );
    }
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: we want this
      <div css={styles.competitionFormatter} key={`tournament_part_${i}`}>
        {element} -{' '}
      </div>
    );
  });
};

interface HeadToHeadHeaderProps {
  date: string;
  tournament?: string;
  tournamentDescriptionLabel: string;
  status: EventStatusType;
  period?: string;
}

const HeadToHeadHeader = ({
  date,
  tournamentDescriptionLabel,
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
      {formatTournamentDescriptionLabel(tournamentDescriptionLabel)}
    </div>
  </div>
);

export default HeadToHeadHeader;
