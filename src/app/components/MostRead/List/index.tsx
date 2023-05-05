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

OneColumnGrid.defaultProps = {
  role: 'list',
};

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
