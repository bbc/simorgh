// biome-ignore-all lint/a11y/useValidAriaRole: we want this

import styles from '../index.styles';
import type { Alignment, PlayerActions } from '../types';
import ActionsTime from './actions-time';

interface ActionProps {
  contestantActions: PlayerActions[];
  alignment: Alignment;
}

const Action = ({ contestantActions, alignment }: ActionProps) => (
  <ul css={styles.actionList(alignment)}>
    {contestantActions.map((player, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: we want this
      <li css={styles.actionItem(alignment)} key={index}>
        <span role="text">{player.playerName} </span>
        <ActionsTime player={player} />
      </li>
    ))}
  </ul>
);

export default Action;
