import React from 'react';
import styled from '@emotion/styled';
import { oneOf, number, node } from 'prop-types';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import Grid from '#psammead/psammead-grid/src';
import { mostReadListGridProps } from '../../../legacy/containers/MostRead/utilities';

interface MostReadListProps {
  children: React.ReactNode;
  dir: 'rtl' | 'ltr';
  columnLayout: 'oneColumn' | 'twoColumn' | 'multiColumn';
  numberOfItems: number;
}

const OneColumnGrid = styled(Grid)`
  list-style-type: none;
  margin: 0;
  padding: 0;
  grid-auto-flow: column;
  grid-template-rows: repeat(${props => props.numberOfItems}, auto);
`;

OneColumnGrid.defaultProps = {
  role: 'list',
};

const TwoColumnGrid = styled(OneColumnGrid)`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    grid-template-rows: repeat(
      ${props => Math.ceil(props.numberOfItems / 2)},
      auto
    );
  }
`;

const MultiColumnGrid = styled(TwoColumnGrid)`
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-auto-flow: row;
  }
`;

const getColumnLayout = columnLayout =>
  ({
    oneColumn: OneColumnGrid,
    twoColumn: TwoColumnGrid,
    multiColumn: MultiColumnGrid,
  }[columnLayout]);

const MostReadList = ({
  numberOfItems,
  dir,
  columnLayout,
  children,
}: MostReadListProps) => {
  const MostReadListGrid = getColumnLayout(columnLayout);

  return (
    <MostReadListGrid
      {...mostReadListGridProps(columnLayout)}
      dir={dir}
      numberOfItems={numberOfItems}
      as="ol"
    >
      {children}
    </MostReadListGrid>
  );
};

export default MostReadList;
