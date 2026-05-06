/** @jsxImportSource @emotion/react */
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from './index.styles';
import Card from './card';

const goalTypesHandled: Record<string, string> = {
  Penalty: 'pen',
  'Own Goal': 'og',
};

const displayGoalType = (goalType: string): string =>
  goalTypesHandled[goalType] ? ` ${goalTypesHandled[goalType]}` : '';

interface PlayerAction {
  type: string;
  typeLabel: { value: string; accessible: string };
  timeLabel: { value: string; accessible: string };
}

interface Player {
  playerName: string;
  actionType: string;
  actions: PlayerAction[];
}

interface ActionsTimeProps {
  player: Player;
}

const ActionsTime = ({ player }: ActionsTimeProps) => {
  const times = player.actions.map(
    action => `${action.timeLabel.value}${displayGoalType(action.type)}`,
  );
  const timesAccessible = player.actions
    .map(
      action => `${action.typeLabel.accessible} ${action.timeLabel.accessible}`,
    )
    .join(', ');
  return (
    <>
      {times.map((time, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <span aria-hidden key={index}>
          <span css={styles.textBlock()}>
            {index === 0 && '('}
            {player.actionType === 'card' && <Card player={player} />}
            {time}
            {index === times.length - 1 && ')'}
          </span>
          {index !== times.length - 1 && ', '}
        </span>
      ))}
      <VisuallyHiddenText>{timesAccessible}</VisuallyHiddenText>
    </>
  );
};

export default ActionsTime;
