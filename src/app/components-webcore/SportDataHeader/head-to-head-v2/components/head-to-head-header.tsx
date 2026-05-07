import { isLiveStatus } from '../helpers/event-status-groups';
import styles from './index.styles';
import type { EventStatus } from '../types';

const formatTournamentDescriptionLabel = (
  tournamentDescriptionLabel: string,
) => {
  const tournamentGroupsArray = tournamentDescriptionLabel.split(' - ');

  return tournamentGroupsArray.map((element, i) => {
    if (tournamentGroupsArray.length === i + 1) {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div css={styles.competitionFormatter()} key={`tournament_part_${i}`}>
          {element}
        </div>
      );
    }
    return (
      // eslint-disable-next-line react/no-array-index-key
      <div css={styles.competitionFormatter()} key={`tournament_part_${i}`}>
        {element} -{' '}
      </div>
    );
  });
};

interface HeadToHeadHeaderProps {
  date: string;
  tournamentDescriptionLabel: string;
  status: EventStatus;
}

const HeadToHeadHeader = ({
  date,
  tournamentDescriptionLabel,
  status,
}: HeadToHeadHeaderProps) => (
  <div css={styles.headerWrapper(isLiveStatus(status))}>
    {!isLiveStatus(status) && (
      <div css={styles.dateWrapper()}>
        <div css={styles.dateHeader()}>
          <time css={styles.date()}>{date}</time>
        </div>
        <div css={styles.interpunct()} aria-hidden>
          ‧
        </div>
      </div>
    )}
    <div css={styles.tournamentHeader()}>
      {formatTournamentDescriptionLabel(tournamentDescriptionLabel)}
    </div>
  </div>
);

export default HeadToHeadHeader;
