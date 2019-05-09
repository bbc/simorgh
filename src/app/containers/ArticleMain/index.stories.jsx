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

// eslint-disable-next-line react/prop-types
const ColouredDiv = ({ colour, children }) => (
  <div style={{ backgroundColor: colour }}>{children}</div>
);

storiesOf('Grid Examples', module)
  .add('GridItemConstrainedSmall', () => (
    <GhostWrapper>
      <GridItemConstrainedSmall>
        <ColouredDiv colour={babyBlue}>GridItemConstrainedSmall</ColouredDiv>
      </GridItemConstrainedSmall>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedMedium', () => (
    <GhostWrapper>
      <GridItemConstrainedMedium>
        <ColouredDiv colour={babyBlue}>GridItemConstrainedMedium</ColouredDiv>
      </GridItemConstrainedMedium>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLarge', () => (
    <GhostWrapper>
      <GridItemConstrainedLarge>
        <ColouredDiv colour={babyBlue}>GridItemConstrainedLarge</ColouredDiv>
      </GridItemConstrainedLarge>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLargeNoMargin', () => (
    <GhostWrapper>
      <GridItemConstrainedLargeNoMargin>
        <ColouredDiv colour={babyBlue}>
          GridItemConstrainedLargeNoMargin
        </ColouredDiv>
      </GridItemConstrainedLargeNoMargin>
    </GhostWrapper>
  ));
