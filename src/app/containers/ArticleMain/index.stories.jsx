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
const GridItem = ({ children }) => (
  <div style={{ height: '100%', overtflow: 'auto', backgroundColor: babyBlue }}>
    {children}
  </div>
);

storiesOf('Grid Examples', module)
  .add('GridItemConstrainedSmall', () => (
    <GhostWrapper>
      <GridItemConstrainedSmall>
        <GridItem>GridItemConstrainedSmall</GridItem>
      </GridItemConstrainedSmall>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedMedium', () => (
    <GhostWrapper>
      <GridItemConstrainedMedium>
        <GridItem>GridItemConstrainedMedium</GridItem>
      </GridItemConstrainedMedium>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLarge', () => (
    <GhostWrapper>
      <GridItemConstrainedLarge>
        <GridItem>GridItemConstrainedLarge</GridItem>
      </GridItemConstrainedLarge>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLargeNoMargin', () => (
    <GhostWrapper>
      <GridItemConstrainedLargeNoMargin>
        <GridItem>GridItemConstrainedLargeNoMargin</GridItem>
      </GridItemConstrainedLargeNoMargin>
    </GhostWrapper>
  ));
