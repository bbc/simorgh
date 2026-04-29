/* eslint-disable import/prefer-default-export */
// import React from 'react';
// import styled, { css } from '@bbc/web-styled';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
// import { GROUP_3, SPACING_4 } from '@bbc/web-gel-foundations';
// import Heading from '@bbc/web-components/heading/index.js';
import Action from './action.jsx';
import { GRID_AREAS } from './action-grid.jsx';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../utilities/pixelsToRem';

const KeyEventsStyles = css`
  padding: 0 16px;
  @media (min-width: ${pixelsToRem(600)}rem) {
    padding: 0;
  }

  @supports not (display: grid) {
    display: inline-flex;
    width: 50%;
    padding: 0 16px;
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

export const KeyEvents = ({
  homeKeyEvents,
  awayKeyEvents,
  homeName,
  awayName,
}) => (
  <>
    <VisuallyHiddenText as="h3">Key Events</VisuallyHiddenText>
    <KeyEventsHome>
      <VisuallyHiddenText as="h4">{homeName}</VisuallyHiddenText>
      <Action contestantActions={homeKeyEvents} alignment="home" />
    </KeyEventsHome>
    <KeyEventsAway>
      <VisuallyHiddenText as="h4">{awayName}</VisuallyHiddenText>
      <Action contestantActions={awayKeyEvents} alignment="away" />
    </KeyEventsAway>
  </>
);
