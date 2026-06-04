import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from '../index.styles';
import Card from './card';
import type { PlayerActions } from '../types';

// TODO - get a translation for this
const goalTypesHandled: Record<string, string> = {
  'Own Goal': 'og',
};

const displayGoalType = (goalType: string, penaltiesTranslation: string) => {
  if (goalType === 'Penalty') {
    return ` ${penaltiesTranslation}`;
  }

  if (goalTypesHandled[goalType]) {
    return ` ${goalTypesHandled[goalType]}`;
  }

  return '';
};

interface ActionsTimeProps {
  player: PlayerActions;
}

const ActionsTime = ({ player }: ActionsTimeProps) => {
  const { translations } = use(ServiceContext);
  const penaltiesTranslation =
    translations?.sport?.penaltyAbbreviation || 'pen';

  const times = player.actions.map(
    action =>
      `${action.timeLabel.translated || action.timeLabel.value}${displayGoalType(action.type, penaltiesTranslation)}`,
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
