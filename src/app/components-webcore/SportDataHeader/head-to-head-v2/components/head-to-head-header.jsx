import { isLiveStatus } from '../helpers/event-status-groups';
import styles from './index.styles';

const formatTournamentDescriptionLabel = tournamentDescriptionLabel => {
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

const HeadToHeadHeader = ({ date, tournamentDescriptionLabel, status }) => (
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
