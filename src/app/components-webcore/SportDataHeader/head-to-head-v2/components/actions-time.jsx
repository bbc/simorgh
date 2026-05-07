
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from './index.styles';
import Card from './card';

const goalTypesHandled = {
  Penalty: 'pen',
  'Own Goal': 'og',
};

const displayGoalType = goalType =>
  goalTypesHandled[goalType] ? ` ${goalTypesHandled[goalType]}` : '';

const ActionsTime = ({ player }) => {
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
