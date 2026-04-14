import React from 'react';
import styled, { css } from '@bbc/web-styled';
import { GROUP_3, SPACING_4 } from '@bbc/web-gel-foundations';
import Heading from '@bbc/web-components/heading/index.js';
import Action from './action.jsx';
import { GRID_AREAS } from './action-grid.jsx';

const KeyEventsStyles = css`
  padding: 0 ${SPACING_4};
  @media (min-width: ${GROUP_3}) {
    padding: 0;
  }

  @supports not (display: grid) {
    display: inline-flex;
    width: 50%;
    padding: 0 ${SPACING_4};
    box-sizing: border-box;
  }
`;

const KeyEventsHome = styled.div`
  ${KeyEventsStyles}
  text-align: right;
  grid-area: ${GRID_AREAS.homeText};
`;

const KeyEventsAway = styled.div`
  ${KeyEventsStyles}
  grid-area: ${GRID_AREAS.awayText};
`;

export const KeyEvents = ({ homeKeyEvents, awayKeyEvents, homeName, awayName }) => (
  <>
    <Heading level="3" fontScale="headlineLarge" isVisuallyHidden>
      Key Events
    </Heading>
    <KeyEventsHome>
      <Heading level="4" fontScale="headlineLarge" isVisuallyHidden>
        {homeName}
      </Heading>
      <Action contestantActions={homeKeyEvents} alignment="home" />
    </KeyEventsHome>
    <KeyEventsAway>
      <Heading level="4" fontScale="headlineLarge" isVisuallyHidden>
        {awayName}
      </Heading>
      <Action contestantActions={awayKeyEvents} alignment="away" />
    </KeyEventsAway>
  </>
);
