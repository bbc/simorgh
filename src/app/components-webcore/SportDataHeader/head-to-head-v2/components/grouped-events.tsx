import { ActionGrid } from './action-grid';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from './index.styles';
import type { GroupedActions as GroupedActionsType } from '../types';

interface ActionsDisplayProps {
  teamActions: string[];
  teamAccessibleActions?: string[];
}

const ActionsDisplay = ({
  teamActions,
  teamAccessibleActions,
}: ActionsDisplayProps) => {
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

  return <>{teamActions.join(', ')}</>;
};

interface GroupedEventsProps {
  groupedEvents: GroupedActionsType[];
  homeName: string;
  awayName: string;
}

export const GroupedEvents = ({
  groupedEvents,
  homeName,
  awayName,
}: GroupedEventsProps) => (
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
                  <ActionsDisplay
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
                  <ActionsDisplay
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
