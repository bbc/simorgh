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
} from './styledGrid';

const red = '#ffaacc';
const orange = '#ffddcc';
const yellow = '#ffffcc';
const green = '#cceecc';
const blue = '#cceeff';
const indigo = '#ccccff';
const violet = '#ccaaee';

const ColouredDiv = styled.div`
  background-color: ${props => props.colour};
`;

storiesOf('Grid Examples', module)
  .add('GridItemConstrainedSmall', () => (
    <GhostWrapper>
      <GridItemConstrainedSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '1' }}>
          <ColouredDiv colour={red}>1/4 or 1/5 or 1/8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '2' }}>
          <ColouredDiv colour={orange}>2/4 or 2/5 or 2/8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '3' }}>
          <ColouredDiv colour={yellow}>3/4 or 2/5 or 2/8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '4' }}>
          <ColouredDiv colour={green}>4/4 or 2/5 or 2/8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '5' }}>
          <ColouredDiv colour={blue}>4/4 or 5/5 or 5/8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '6' }}>
          <ColouredDiv colour={indigo}>4/4 or 5/5 or 6/8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '7' }}>
          <ColouredDiv colour={violet}>4/4 or 5/5 or 7/8</ColouredDiv>
        </NestedGridItemSmall>
        <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '8' }}>
          <ColouredDiv colour={red}>4/4 or 5/5 or 8/8</ColouredDiv>
        </NestedGridItemSmall>
      </GridItemConstrainedSmall>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedMedium', () => (
    <GhostWrapper>
      <GridItemConstrainedMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '1' }}>
          <ColouredDiv colour={red}>1/5 or 1/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '2' }}>
          <ColouredDiv colour={orange}>2/5 or 2/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '3' }}>
          <ColouredDiv colour={yellow}>3/5 or 3/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '4' }}>
          <ColouredDiv colour={green}>4/5 or 4/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '5' }}>
          <ColouredDiv colour={blue}>5/5 or 5/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '6' }}>
          <ColouredDiv colour={violet}>5/5 or 6/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '7' }}>
          <ColouredDiv colour={indigo}>5/5 or 7/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '8' }}>
          <ColouredDiv colour={red}>5/5 or 8/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '9' }}>
          <ColouredDiv colour={orange}>5/5 or 9/10</ColouredDiv>
        </NestedGridItemMedium>
        <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '10' }}>
          <ColouredDiv colour={yellow}>5/5 or 10/10</ColouredDiv>
        </NestedGridItemMedium>
      </GridItemConstrainedMedium>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLarge', () => (
    <GhostWrapper>
      <GridItemConstrainedLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '1' }}>
          <ColouredDiv colour={red}>1/6 or 1/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '2' }}>
          <ColouredDiv colour={orange}>2/6 or 2/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '3' }}>
          <ColouredDiv colour={yellow}>3/6 or 3/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '4' }}>
          <ColouredDiv colour={green}>4/6 or 4/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '5' }}>
          <ColouredDiv colour={blue}>5/6 or 5/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '6' }}>
          <ColouredDiv colour={violet}>6/6 or 6/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '7' }}>
          <ColouredDiv colour={indigo}>6/6 or 7/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '8' }}>
          <ColouredDiv colour={red}>6/6 or 8/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '9' }}>
          <ColouredDiv colour={orange}>6/6 or 9/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '10' }}>
          <ColouredDiv colour={yellow}>6/6 or 10/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '11' }}>
          <ColouredDiv colour={green}>6/6 or 11/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '12' }}>
          <ColouredDiv colour={blue}>6/6 or 12/12</ColouredDiv>
        </NestedGridItemLarge>
      </GridItemConstrainedLarge>
    </GhostWrapper>
  ))
  .add('GridItemConstrainedLargeNoMargin', () => (
    <GhostWrapper>
      <GridItemConstrainedLargeNoMargin>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '1' }}>
          <ColouredDiv colour={red}>1/6 or 1/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '2' }}>
          <ColouredDiv colour={orange}>2/6 or 2/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '3' }}>
          <ColouredDiv colour={yellow}>3/6 or 3/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '4' }}>
          <ColouredDiv colour={green}>4/6 or 4/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '5' }}>
          <ColouredDiv colour={blue}>5/6 or 5/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '6' }}>
          <ColouredDiv colour={violet}>6/6 or 6/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '7' }}>
          <ColouredDiv colour={indigo}>6/6 or 7/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '8' }}>
          <ColouredDiv colour={red}>6/6 or 8/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '9' }}>
          <ColouredDiv colour={orange}>6/6 or 9/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '10' }}>
          <ColouredDiv colour={yellow}>6/6 or 10/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '11' }}>
          <ColouredDiv colour={green}>6/6 or 11/12</ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '12' }}>
          <ColouredDiv colour={blue}>6/6 or 12/12</ColouredDiv>
        </NestedGridItemLarge>
      </GridItemConstrainedLargeNoMargin>
    </GhostWrapper>
  ))
  .add('Example of multi-breakpoint span', () => (
    <GhostWrapper>
      <GridItemConstrainedLargeNoMargin>
        <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '12' }}>
          <ColouredDiv colour={blue}>
            Spanning 12 columns - e.g. and image
          </ColouredDiv>
        </NestedGridItemLarge>
        <NestedGridItemLarge
          gridColumnStart="1"
          gridSpan={{ group3: '5', group4: '5', group5: '10' }}
        >
          <ColouredDiv colour={red}>
            {
              'Spanning 5 columns at groups <= 4 & 10 columns at group 5 - e.g. a caption'
            }
          </ColouredDiv>
        </NestedGridItemLarge>
      </GridItemConstrainedLargeNoMargin>
    </GhostWrapper>
  ));
