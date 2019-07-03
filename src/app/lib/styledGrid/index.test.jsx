import React from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';
import {
  GhostGrid,
  GridItemConstrainedSmall,
  GridItemConstrainedMedium,
  GridItemConstrainedLarge,
  GridItemConstrainedLargeNoMargin,
  NestedGridItemSmall,
  NestedGridItemMedium,
  NestedGridItemLarge,
  PopOutGridItemMedium,
} from '.';

describe('Styled Grid items', () => {
  describe('GridItemConstrainedSmall', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GhostGrid>
        <GridItemConstrainedSmall>
          <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemSmall>
        </GridItemConstrainedSmall>
      </GhostGrid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GhostGrid>
        <GridItemConstrainedSmall>
          <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '6' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemSmall>
        </GridItemConstrainedSmall>
      </GhostGrid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GhostGrid>
        <GridItemConstrainedSmall>
          <NestedGridItemSmall
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              {'Spanning a various number of columns depending on breakpoint'}
            </div>
          </NestedGridItemSmall>
        </GridItemConstrainedSmall>
      </GhostGrid>,
    );
  });

  describe('GridItemConstrainedMedium', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GhostGrid>
        <GridItemConstrainedMedium>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemMedium>
        </GridItemConstrainedMedium>
      </GhostGrid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GhostGrid>
        <GridItemConstrainedMedium>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '8' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemMedium>
        </GridItemConstrainedMedium>
      </GhostGrid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GhostGrid>
        <GridItemConstrainedMedium>
          <NestedGridItemMedium
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              {'Spanning a various number of columns depending on breakpoint'}
            </div>
          </NestedGridItemMedium>
        </GridItemConstrainedMedium>
      </GhostGrid>,
    );
  });

  describe('GridItemConstrainedLarge', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GhostGrid>
        <GridItemConstrainedLarge>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLarge>
      </GhostGrid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GhostGrid>
        <GridItemConstrainedLarge>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '8' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLarge>
      </GhostGrid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GhostGrid>
        <GridItemConstrainedLarge>
          <NestedGridItemLarge
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              {'Spanning a various number of columns depending on breakpoint'}
            </div>
          </NestedGridItemLarge>
        </GridItemConstrainedLarge>
      </GhostGrid>,
    );
  });

  describe('GridItemConstrainedLargeNoMargin', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GhostGrid>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </GhostGrid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GhostGrid>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '20' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </GhostGrid>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GhostGrid>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              {'Spanning a various number of columns depending on breakpoint'}
            </div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </GhostGrid>,
    );
    shouldMatchSnapshot(
      'should pop out of grid at Group 5 breakpoint',
      <GhostGrid>
        <PopOutGridItemMedium>Group 5 pop out grid.</PopOutGridItemMedium>
      </GhostGrid>,
    );
  });
});
