
/* eslint-disable jsx-a11y/aria-role */
import ActionsTime from './actions-time';
import styles from './index.styles';

const Action = ({ contestantActions, alignment }) => (
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
