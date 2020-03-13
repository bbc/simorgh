import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import {
  GridWrapper,
  GridItemConstrainedSmall,
  GridItemConstrainedMedium,
  GridItemConstrainedMediumNoMargin,
  GridItemConstrainedLarge,
  GridItemConstrainedLargeNoMargin,
  NestedGridItemSmall,
  NestedGridItemMedium,
  NestedGridItemLarge,
  PopOutGridItemMedium,
} from '.';

describe('Styled GridWrapper items', () => {
  describe('GridWrapper', () => {
    shouldMatchSnapshot('should render correctly', <GridWrapper />);
  });

  describe('GridItemConstrainedSmall', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GridWrapper>
        <GridItemConstrainedSmall>
          <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemSmall>
        </GridItemConstrainedSmall>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GridWrapper>
        <GridItemConstrainedSmall>
          <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '6' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemSmall>
        </GridItemConstrainedSmall>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GridWrapper>
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
              Spanning a various number of columns depending on breakpoint
            </div>
          </NestedGridItemSmall>
        </GridItemConstrainedSmall>
      </GridWrapper>,
    );
  });

  describe('GridItemConstrainedMedium', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GridWrapper>
        <GridItemConstrainedMedium>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemMedium>
        </GridItemConstrainedMedium>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GridWrapper>
        <GridItemConstrainedMedium>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '8' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemMedium>
        </GridItemConstrainedMedium>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GridWrapper>
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
              Spanning a various number of columns depending on breakpoint
            </div>
          </NestedGridItemMedium>
        </GridItemConstrainedMedium>
      </GridWrapper>,
    );
  });

  describe('GridItemConstrainedMediumNoMargin', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GridWrapper>
        <GridItemConstrainedMediumNoMargin>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemMedium>
        </GridItemConstrainedMediumNoMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GridWrapper>
        <GridItemConstrainedMediumNoMargin>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '8' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemMedium>
        </GridItemConstrainedMediumNoMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GridWrapper>
        <GridItemConstrainedMediumNoMargin>
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
              Spanning a various number of columns depending on breakpoint
            </div>
          </NestedGridItemMedium>
        </GridItemConstrainedMediumNoMargin>
      </GridWrapper>,
    );
  });

  describe('GridItemConstrainedLarge', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GridWrapper>
        <GridItemConstrainedLarge>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLarge>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GridWrapper>
        <GridItemConstrainedLarge>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '8' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLarge>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GridWrapper>
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
              Spanning a various number of columns depending on breakpoint
            </div>
          </NestedGridItemLarge>
        </GridItemConstrainedLarge>
      </GridWrapper>,
    );
  });

  describe('GridItemConstrainedLargeNoMargin', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GridWrapper>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GridWrapper>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '20' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GridWrapper>
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
              Spanning a various number of columns depending on breakpoint
            </div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should pop out of grid at Group 5 breakpoint',
      <GridWrapper>
        <PopOutGridItemMedium>Group 5 pop out grid.</PopOutGridItemMedium>
      </GridWrapper>,
    );
  });
});
