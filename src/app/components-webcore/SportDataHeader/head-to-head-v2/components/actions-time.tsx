import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from '../index.styles';
import type { PlayerActions } from '../types';
import Card from './card';

const goalTypesHandled: Record<string, string> = {
  Penalty: 'pen',
  'Own Goal': 'og',
};

const displayGoalType = (goalType: string) =>
  goalTypesHandled[goalType] ? ` ${goalTypesHandled[goalType]}` : '';

interface ActionsTimeProps {
  player: PlayerActions;
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
        // biome-ignore lint/suspicious/noArrayIndexKey: we want this
        <span aria-hidden key={index}>
          <span css={styles.textBlock}>
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
