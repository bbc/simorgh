import React from 'react';
import { shouldMatchSnapshot } from '../helpers/tests/testHelpers';
import {
  GhostWrapper,
  GridItemConstrainedSmall,
  GridItemConstrainedMedium,
  GridItemConstrainedLarge,
  GridItemConstrainedLargeNoMargin,
  NestedGridItemSmall,
  NestedGridItemMedium,
  NestedGridItemLarge,
} from './styledGrid';

describe('Styled Grid items', () => {
  describe('GridItemConstrainedSmall', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GhostWrapper>
        <GridItemConstrainedSmall>
          <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemSmall>
        </GridItemConstrainedSmall>
      </GhostWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GhostWrapper>
        <GridItemConstrainedSmall>
          <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '6' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemSmall>
        </GridItemConstrainedSmall>
      </GhostWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GhostWrapper>
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
      </GhostWrapper>,
    );
  });

  describe('GridItemConstrainedMedium', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GhostWrapper>
        <GridItemConstrainedMedium>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemMedium>
        </GridItemConstrainedMedium>
      </GhostWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GhostWrapper>
        <GridItemConstrainedMedium>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '8' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemMedium>
        </GridItemConstrainedMedium>
      </GhostWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GhostWrapper>
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
      </GhostWrapper>,
    );
  });

  describe('GridItemConstrainedLarge', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GhostWrapper>
        <GridItemConstrainedLarge>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLarge>
      </GhostWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GhostWrapper>
        <GridItemConstrainedLarge>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '8' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLarge>
      </GhostWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GhostWrapper>
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
      </GhostWrapper>,
    );
  });

  describe('GridItemConstrainedLargeNoMargin', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GhostWrapper>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </GhostWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GhostWrapper>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '20' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </GhostWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GhostWrapper>
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
      </GhostWrapper>,
    );
  });
});
