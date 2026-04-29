/* eslint-disable jsx-a11y/aria-role */
// import React from 'react';
// import styled from '@bbc/web-styled';
import styled from '@emotion/styled';

// import {
//   fontEmphasised,
//   fontScaleBody,
//   fontScaleDescription,
//   GROUP_3,
//   SPACING_1,
//   SPACING_2,
//   SPACING_3
// } from '@bbc/web-gel-foundations';
import ActionsTime from './actions-time.jsx';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../utilities/pixelsToRem';

const StyledAction = styled.li`
  ${'' /* ${fontEmphasised} */}
  font-family: ReithSans, Helvetica, Arial, freesans, sans-serif;
  font-weight: 700;
  font-feature-settings: 'ss01' off;

  ${'' /* ${fontScaleDescription} */}
  font-size: 14px;
  line-height: 1.2857142857142858;

  padding-bottom: 8px;
  @media (min-width: ${pixelsToRem(600)}rem) {
    ${'' /* ${fontScaleBody} */}
    font-size: 1rem;
    line-height: 1.375;
    padding-bottom: 8px;
    ${({ alignment }) =>
      `padding-${alignment === 'home' ? 'left' : 'right'}: 12px`};
  }
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0; // reset
  margin: 0; // reset

  @media (min-width: ${pixelsToRem(600)}rem) {
    display: flex;
    flex-wrap: wrap;
    padding-top: 4px;
    justify-content: ${({ alignment }) =>
      alignment === 'home' ? `flex-end` : `flex-start`};
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
