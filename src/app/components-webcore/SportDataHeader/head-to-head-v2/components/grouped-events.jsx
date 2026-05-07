
import { ActionGrid } from './action-grid';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from './index.styles';

const Actions = ({ teamActions, teamAccessibleActions }) => {
  if (teamAccessibleActions?.length) {
    return (
      <>
        <span aria-hidden>{teamActions.join(', ')}</span>
        <VisuallyHiddenText>
          {teamAccessibleActions.join(', ')}
        </VisuallyHiddenText>
      </>
    );
  }

  return teamActions.join(', ');
};

// eslint-disable-next-line import/prefer-default-export
export const GroupedEvents = ({ groupedEvents, homeName, awayName }) => (
  <div css={styles.groupedEventsWrapper()}>
    {groupedEvents.map(
      ({
        groupName,
        homeTeamActions,
        homeTeamAccessibleActions,
        awayTeamActions,
        awayTeamAccessibleActions,
      }) => (
        <div css={styles.actionWrapper()} key={groupName.fullName}>
          <ActionGrid>
            <div css={styles.groupLabel()}>{groupName.fullName}</div>
            <div css={styles.groupedHomeEvent()}>
              {homeTeamActions.length > 0 && (
                <>
                  <VisuallyHiddenText>{`${homeName},`}</VisuallyHiddenText>
                  <Actions
                    teamActions={homeTeamActions}
                    teamAccessibleActions={homeTeamAccessibleActions}
                  />
                </>
              )}
            </div>
            <div css={styles.groupedAwayEvent()}>
              {awayTeamActions.length > 0 && (
                <>
                  <VisuallyHiddenText>{`${awayName},`}</VisuallyHiddenText>
                  <Actions
                    teamActions={awayTeamActions}
                    teamAccessibleActions={awayTeamAccessibleActions}
                  />
                </>
              )}
            </div>
          </ActionGrid>
        </div>
      ),
    )}
  </div>
);
