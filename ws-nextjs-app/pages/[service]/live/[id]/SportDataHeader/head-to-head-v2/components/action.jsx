/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import styled from '@bbc/web-styled';
import {
  fontEmphasised,
  fontScaleBody,
  fontScaleDescription,
  GROUP_3,
  SPACING_1,
  SPACING_2,
  SPACING_3
} from '@bbc/web-gel-foundations';
import ActionsTime from './actions-time.jsx';

const StyledAction = styled.li`
  ${fontEmphasised}

  ${fontScaleDescription}
  padding-bottom: ${SPACING_2};
  @media (min-width: ${GROUP_3}) {
    ${fontScaleBody}
    padding-bottom: ${SPACING_2};
    ${({ alignment }) => `padding-${alignment === 'home' ? 'left' : 'right'}: ${SPACING_3}`};
  }
`;

const StyledUl = styled.ul`
  @media (min-width: ${GROUP_3}) {
    display: flex;
    flex-wrap: wrap;
    padding-top: ${SPACING_1};
    justify-content: ${({ alignment }) => (alignment === 'home' ? `flex-end` : `flex-start`)};
  }
`;

const Action = ({ contestantActions, alignment }) => (
  <StyledUl alignment={alignment}>
    {contestantActions.map((player, index) => (
      <StyledAction key={index} alignment={alignment}>
        <span role="text">{player.playerName} </span>
        <ActionsTime player={player} />
      </StyledAction>
    ))}
  </StyledUl>
);

export default Action;
