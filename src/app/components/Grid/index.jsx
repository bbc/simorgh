import React from 'react';
import { node, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { C_GHOST } from '@bbc/psammead-styles/colours';

const group4WrapperMaxWidth = `63rem`; // 1008px
const group5WrapperMaxWidth = `80rem`; // 1280px

const gelMaxWidths = css`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 auto;
    max-width: ${group4WrapperMaxWidth};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${group5WrapperMaxWidth};
  }
`;

export const GelPageGrid = styled(Grid)`
  ${gelMaxWidths}
`;

export const GelPageGridGhost = styled(Grid)`
  ${gelMaxWidths}
  background-color: ${C_GHOST};
`;

export const GridMaxWidthGroup4 = styled(Grid)`
  margin: 0 auto;
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${group4WrapperMaxWidth};
  }
`;

export default Grid;

export const ArticlePageGrid = ({ children, dir }) => (
  <GelPageGrid
    dir={dir}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 20,
    }}
    enableGelGutters
  >
    {children}
  </GelPageGrid>
);

ArticlePageGrid.propTypes = {
  children: node.isRequired,
  dir: oneOf[('ltr', 'rtl')],
};
ArticlePageGrid.defaultProps = {
  dir: 'ltr',
};
