/* eslint-disable jsx-a11y/aria-role */
import ActionsTime from './actions-time';
import styles from './index.styles';

interface ActionData {
  type: string;
  typeLabel: {
    value: string;
    accessible: string;
  };
  timeLabel: {
    value: string;
    accessible: string;
  };
}

interface PlayerAction {
  playerId: string;
  playerName: string;
  actionType: string;
  actions: ActionData[];
}

interface ActionProps {
  contestantActions: PlayerAction[];
  alignment: 'home' | 'away';
}

const Action = ({ contestantActions, alignment }: ActionProps) => (
  <ul css={styles.actionList(alignment)}>
    {contestantActions.map((player, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li css={styles.actionItem(alignment)} key={index}>
        <span role="text">{player.playerName} </span>
        <ActionsTime player={player} />
      </li>
    ))}
  </ul>
);

export default Action;

export type { PlayerAction, ActionData };
