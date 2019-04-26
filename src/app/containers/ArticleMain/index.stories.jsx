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
const BlueDiv = ({ children }) => (
  <div style={{ height: '100%', overtflow: 'auto', backgroundColor: 'blue' }}>
    {children}
  </div>
);

storiesOf('Grid Examples', module)
  .add('GridItemConstrainedSmall', () => (
    <GhostWrapper>
      <GridItemConstrainedSmall>
        <BlueDiv>GridItemConstrainedSmall</BlueDiv>
      </GridItemConstrainedSmall>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedMedium', () => (
    <GhostWrapper>
      <GridItemConstrainedMedium>
        <BlueDiv>GridItemConstrainedMedium</BlueDiv>
      </GridItemConstrainedMedium>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLarge', () => (
    <GhostWrapper>
      <GridItemConstrainedLarge>
        <BlueDiv>GridItemConstrainedLarge</BlueDiv>
      </GridItemConstrainedLarge>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLargeNoMargin', () => (
    <GhostWrapper>
      <GridItemConstrainedLargeNoMargin>
        <BlueDiv>GridItemConstrainedLargeNoMargin</BlueDiv>
      </GridItemConstrainedLargeNoMargin>
    </GhostWrapper>
  ));
