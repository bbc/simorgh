import { ActionGrid } from './action-grid';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from './index.styles';

interface ActionsComponentProps {
  teamActions: string[];
  teamAccessibleActions?: string[];
}

const ActionsComponent = ({
  teamActions,
  teamAccessibleActions,
}: ActionsComponentProps) => {
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

interface GroupedEvent {
  groupName: { fullName: string; shortName: string };
  homeTeamActions: string[];
  homeTeamAccessibleActions?: string[];
  awayTeamActions: string[];
  awayTeamAccessibleActions?: string[];
}

interface GroupedEventsProps {
  groupedEvents: GroupedEvent[];
  homeName: string;
  awayName: string;
}

// eslint-disable-next-line import/prefer-default-export
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
                  <ActionsComponent
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
                  <ActionsComponent
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
