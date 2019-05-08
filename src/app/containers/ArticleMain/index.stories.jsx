import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {
  GhostWrapper,
  GridItemConstrainedSmall,
  GridItemConstrainedMedium,
  GridItemConstrainedLarge,
  GridItemConstrainedLargeNoMargin,
} from '../../lib/styledGrid';

// eslint-disable-next-line react/prop-types
const ColouredDiv = ({ colour, children }) => (
  <div style={{ backgroundColor: colour }}>{children}</div>
);

storiesOf('Grid Examples', module)
  .add('GridItemConstrainedSmall', () => (
    <GhostWrapper>
      <GridItemConstrainedSmall>
        <ColouredDiv colour="blue">GridItemConstrainedSmall</ColouredDiv>
      </GridItemConstrainedSmall>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedMedium', () => (
    <GhostWrapper>
      <GridItemConstrainedMedium>
        <ColouredDiv colour="blue">GridItemConstrainedMedium</ColouredDiv>
      </GridItemConstrainedMedium>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLarge', () => (
    <GhostWrapper>
      <GridItemConstrainedLarge>
        <ColouredDiv colour="blue">GridItemConstrainedLarge</ColouredDiv>
      </GridItemConstrainedLarge>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLargeNoMargin', () => (
    <GhostWrapper>
      <GridItemConstrainedLargeNoMargin>
        <ColouredDiv colour="blue">
          GridItemConstrainedLargeNoMargin
        </ColouredDiv>
      </GridItemConstrainedLargeNoMargin>
    </GhostWrapper>
  ));
