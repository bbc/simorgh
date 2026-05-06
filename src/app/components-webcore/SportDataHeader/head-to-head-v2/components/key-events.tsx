/* eslint-disable import/prefer-default-export */
// import React from 'react';
// import styled, { css } from '@bbc/web-styled';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
// import { GROUP_3, SPACING_4 } from '@bbc/web-gel-foundations';
// import Heading from '@bbc/web-components/heading/index.js';
import Action from './action';
import styles from './index.styles';
import type { Actions } from '../types';

interface KeyEventsProps {
  homeKeyEvents: Actions[];
  awayKeyEvents: Actions[];
  homeName: string;
  awayName: string;
}

export const KeyEvents = ({
  homeKeyEvents,
  awayKeyEvents,
  homeName,
  awayName,
}: KeyEventsProps) => (
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
