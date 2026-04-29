// import React from 'react';
// import styled from '@bbc/web-styled';
import styled from '@emotion/styled';

// import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';

// eslint-disable-next-line import/no-relative-packages
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

import Card from './card.jsx';

const goalTypesHandled = {
  Penalty: 'pen',
  'Own Goal': 'og',
};

const TextBlock = styled.span`
  white-space: nowrap;
`;

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
        <span aria-hidden key={index}>
          <TextBlock>
            {index === 0 && '('}
            {player.actionType === 'card' && <Card player={player} />}
            {time}
            {index === times.length - 1 && ')'}
          </TextBlock>
          {index !== times.length - 1 && ', '}
        </span>
      ))}
      <VisuallyHiddenText>{timesAccessible}</VisuallyHiddenText>
    </>
  );
};

export default ActionsTime;
