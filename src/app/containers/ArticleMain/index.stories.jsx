import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {
  GhostWrapper,
  GridItemConstrainedSmall,
  GridItemConstrainedMedium,
  GridItemConstrainedLarge,
  GridItemConstrainedLargeNoMargin,
} from '../../lib/styledGrid';

const babyBlue = '#54d1ff';
const babyPink = '#ff9ece';

/* eslint-disable react/prop-types */
const ColouredDiv = ({ colour, gridColumnStart, gridSpan, children }) => (
  <div
    style={{
      backgroundColor: colour,
      gridColumn: `${gridColumnStart} / span ${gridSpan}`,
    }}
  >
    {children}
  </div>
);
/* eslint-enable react/prop-types */

storiesOf('Grid Examples', module)
  .add('GridItemConstrainedSmall', () => (
    <GhostWrapper>
      <GridItemConstrainedSmall>
        <ColouredDiv colour={babyBlue} gridColumnStart="1" gridSpan="1">
          span 1/5
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="2">
          span 2/5
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="3">
          span 3/5
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="4">
          span 4/5
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="5">
          span 5/5
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="6">
          span 6/8
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="7">
          span 7/8
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="8">
          span 8/8
        </ColouredDiv>
      </GridItemConstrainedSmall>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedMedium', () => (
    <GhostWrapper>
      <GridItemConstrainedMedium>
        <ColouredDiv colour={babyBlue} gridColumnStart="1" gridSpan="1">
          span 1/5
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="2">
          span 2/5
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="3">
          span 3/5
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="4">
          span 4/5
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="5">
          span 5/5
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="6">
          span 6/10
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="7">
          span 7/10
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="8">
          span 8/10
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="9">
          span 9/10
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="10">
          span 10/10
        </ColouredDiv>
      </GridItemConstrainedMedium>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLarge', () => (
    <GhostWrapper>
      <GridItemConstrainedLarge>
        <ColouredDiv colour={babyBlue} gridColumnStart="1" gridSpan="1">
          span 1/6
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="2">
          span 2/6
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="3">
          span 3/6
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="4">
          span 4/6
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="5">
          span 5/6
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="6">
          span 6/6
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="7">
          span 7/12
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="8">
          span 8/12
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="9">
          span 9/12
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="10">
          span 10/12
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="11">
          span 11/12
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="12">
          span 12/12
        </ColouredDiv>
      </GridItemConstrainedLarge>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLargeNoMargin', () => (
    <GhostWrapper>
      <GridItemConstrainedLargeNoMargin>
        <ColouredDiv colour={babyBlue} gridColumnStart="1" gridSpan="1">
          span 1/6
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="2">
          span 2/6
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="3">
          span 3/6
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="4">
          span 4/6
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="5">
          span 5/6
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="6">
          span 6/6
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="7">
          span 7/12
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="8">
          span 8/12
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="9">
          span 9/12
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="10">
          span 10/12
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="11">
          span 11/12
        </ColouredDiv>
        <ColouredDiv colour={babyPink} gridColumnStart="1" gridSpan="12">
          span 12/12
        </ColouredDiv>
      </GridItemConstrainedLargeNoMargin>
    </GhostWrapper>
  ));
