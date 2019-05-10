import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {
  GhostWrapper,
  GridItemConstrainedSmall,
  GridItemConstrainedMedium,
  GridItemConstrainedLarge,
  GridItemConstrainedLargeNoMargin,
  NestedGridItemSmall,
  NestedGridItemMedium,
  NestedGridItemLarge,
} from '../../lib/styledGrid';

const red = '#ffaacc';
const orange = '#ffddcc';
const yellow = '#ffffcc';
const green = '#cceecc';
const blue = '#cceeff';
const indigo = '#ccccff';
const violet = '#ccaaee';

/* eslint-disable react/prop-types */
const ColouredDiv = styled.div`
  background-color: ${props => props.colour};
`;
/* eslint-enable react/prop-types */

storiesOf('Grid Examples', module)
  .add('GridItemConstrainedSmall', () => (
    <GhostWrapper>
      <GridItemConstrainedSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan="1">
          <ColouredDiv colour={red}>span 1/4 or 5 or 8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan="2">
          <ColouredDiv colour={orange}>span 2/4 or 5 or 8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan="3">
          <ColouredDiv colour={yellow}>span 3/4 or 5 or 8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan="4">
          <ColouredDiv colour={green}>span 4/4 or 5 or 8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan="5">
          <ColouredDiv colour={blue}>span 5/4 or 5 or 8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan="6">
          <ColouredDiv colour={indigo}>span 6/4 or 5 or 8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan="7">
          <ColouredDiv colour={violet}>span 7/4 or 5 or 8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan="8">
          <ColouredDiv colour={red}>span 8/4 or 5 or 8</ColouredDiv>
        </NestedGridItemSmall>
      </GridItemConstrainedSmall>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedMedium', () => (
    <GhostWrapper>
      <GridItemConstrainedMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan="1">
          <ColouredDiv colour={red}>span 1/5 or 10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan="2">
          <ColouredDiv colour={orange}>span 2/5 or 10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan="3">
          <ColouredDiv colour={yellow}>span 3/5 or 10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan="4">
          <ColouredDiv colour={green}>span 4/5 or 10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan="5">
          <ColouredDiv colour={blue}>span 5/5 or 10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan="6">
          <ColouredDiv colour={violet}>span 6/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan="7">
          <ColouredDiv colour={indigo}>span 7/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan="8">
          <ColouredDiv colour={red}>span 8/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan="9">
          <ColouredDiv colour={orange}>span 9/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan="10">
          <ColouredDiv colour={yellow}>span 10/10</ColouredDiv>
        </NestedGridItemMedium>
      </GridItemConstrainedMedium>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLarge', () => (
    <GhostWrapper>
      <GridItemConstrainedLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="1">
          <ColouredDiv colour={red}>span 1/6 or 12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="2">
          <ColouredDiv colour={orange}>span 2/6 or 12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="3">
          <ColouredDiv colour={yellow}>span 3/6 or 12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="4">
          <ColouredDiv colour={green}>span 4/6 or 12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="5">
          <ColouredDiv colour={blue}>span 5/6 or 12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="6">
          <ColouredDiv colour={violet}>span 6/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="7">
          <ColouredDiv colour={indigo}>span 7/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="8">
          <ColouredDiv colour={red}>span 8/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="9">
          <ColouredDiv colour={orange}>span 9/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="10">
          <ColouredDiv colour={yellow}>span 10/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="11">
          <ColouredDiv colour={green}>span 11/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="12">
          <ColouredDiv colour={blue}>span 12/12</ColouredDiv>
        </NestedGridItemLarge>
      </GridItemConstrainedLarge>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLargeNoMargin', () => (
    <GhostWrapper>
      <GridItemConstrainedLargeNoMargin>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="1">
          <ColouredDiv colour={red}>span 1/6 or 12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="2">
          <ColouredDiv colour={orange}>span 2/6 or 12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="3">
          <ColouredDiv colour={yellow}>span 3/6 or 12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="4">
          <ColouredDiv colour={green}>span 4/6 or 12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="5">
          <ColouredDiv colour={blue}>span 5/6 or 12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="6">
          <ColouredDiv colour={violet}>span 6/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="7">
          <ColouredDiv colour={indigo}>span 7/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="8">
          <ColouredDiv colour={red}>span 8/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="9">
          <ColouredDiv colour={orange}>span 9/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="10">
          <ColouredDiv colour={yellow}>span 10/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="11">
          <ColouredDiv colour={green}>span 11/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan="12">
          <ColouredDiv colour={blue}>span 12/12</ColouredDiv>
        </NestedGridItemLarge>
      </GridItemConstrainedLargeNoMargin>
    </GhostWrapper>
  ));
