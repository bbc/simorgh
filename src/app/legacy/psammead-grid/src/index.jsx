import React from 'react';
import { bool, node, number, shape, oneOf } from 'prop-types';
import styled from '@emotion/styled';
import {
  GEL_MARGIN_BELOW_400PX,
  GEL_GUTTER_BELOW_600PX,
  GEL_MARGIN_ABOVE_400PX,
  GEL_GUTTER_ABOVE_600PX,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

const groups = {
  group0: {
    min: null,
    max: GEL_GROUP_0_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_BELOW_600PX,
    marginSize: GEL_MARGIN_BELOW_400PX,
  },
  group1: {
    min: GEL_GROUP_1_SCREEN_WIDTH_MIN,
    max: GEL_GROUP_1_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_BELOW_600PX,
    marginSize: GEL_MARGIN_BELOW_400PX,
  },
  group2: {
    min: GEL_GROUP_2_SCREEN_WIDTH_MIN,
    max: GEL_GROUP_2_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_BELOW_600PX,
    marginSize: GEL_MARGIN_ABOVE_400PX,
  },
  group3: {
    min: GEL_GROUP_3_SCREEN_WIDTH_MIN,
    max: GEL_GROUP_3_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_ABOVE_600PX,
    marginSize: GEL_MARGIN_ABOVE_400PX,
  },
  group4: {
    min: GEL_GROUP_4_SCREEN_WIDTH_MIN,
    max: GEL_GROUP_4_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_ABOVE_600PX,
    marginSize: GEL_MARGIN_ABOVE_400PX,
  },
  group5: {
    min: GEL_GROUP_5_SCREEN_WIDTH_MIN,
    max: null,
    gutterSize: GEL_GUTTER_ABOVE_600PX,
    marginSize: GEL_MARGIN_ABOVE_400PX,
  },
};

const mediaQuery = ({ min, max, styles }) => {
  if (min && max) {
    return `
      @media (min-width: ${min}) and (max-width: ${max}) {
        ${styles}
      }
    `;
  }
  if (min) {
    return `
      @media (min-width: ${min}) {
        ${styles}
      }
    `;
  }
  if (max) {
    return `
      @media (max-width: ${max}) {
        ${styles}
      }
    `;
  }
  return '';
};

const gridMediaQueries = ({
  columns,
  margins,
  gridStartOffset,
  enableGelGutters,
}) => {
  const selectedGroups = Object.keys(columns);

  return selectedGroups.map(group =>
    mediaQuery({
      min: groups[group].min,
      max: groups[group].max,
      styles: `
      grid-template-columns: repeat(${columns[group]}, 1fr);
      grid-column-end: span ${columns[group]};
      ${enableGelGutters ? `grid-column-gap: ${groups[group].gutterSize};` : ``}
      ${margins[group] ? `padding: 0 ${groups[group].marginSize};` : ``}
      ${
        gridStartOffset && gridStartOffset[group]
          ? `grid-column-start: ${gridStartOffset[group]};`
          : ``
      }`,
    }),
  );
};

const startOffsetPercentage = (columnsGroup, gridStartOffsetGroup) =>
  `${(100 / columnsGroup) * (gridStartOffsetGroup - 1)}%`;

const getNegativeOffset = (
  columnsGroup,
  parentColumnsGroup,
  gridStartOffset,
  gridStartOffsetGroup,
) => {
  const isValidOffset =
    gridStartOffset &&
    gridStartOffsetGroup &&
    gridStartOffsetGroup < parentColumnsGroup &&
    columnsGroup === parentColumnsGroup; // if fills out whole page

  return isValidOffset
    ? ` - ${startOffsetPercentage(parentColumnsGroup, gridStartOffsetGroup)}`
    : ``;
};

/*
 * 1 We vertically align to the top so that sibling
 *   grid items that are placed side-by-side within a row
 *   have their text and images aligned
 */
const childrenFallback = (
  item,
  dir,
  columnsGroup,
  marginsGroup,
  marginSize,
  parentColumnsGroup,
  parentEnableGelGutters,
  gutterSize,
  gridStartOffset,
  gridStartOffsetGroup,
) => {
  const negativeOffset = getNegativeOffset(
    columnsGroup,
    parentColumnsGroup,
    gridStartOffset,
    gridStartOffsetGroup,
  );
  const guttersWithinParent = parentColumnsGroup - 1;
  const guttersWithinItem = columnsGroup - 1;
  const adjustedNumberOfGutters = guttersWithinParent + 1; // This is needed since this current implementation cannot handle a negative margin outside the items.

  return ` 
  ${marginsGroup ? `padding: 0 ${marginSize};` : ``}
  ${
    parentEnableGelGutters
      ? ` 
        width: calc(${columnsGroup}/${parentColumnsGroup}*(100% - ${adjustedNumberOfGutters} * ${gutterSize}) + ${guttersWithinItem} * ${gutterSize} ${negativeOffset});
        `
      : ``
  }
  ${
    parentEnableGelGutters && item
      ? `margin: 0 ${parseFloat(gutterSize) / 2}rem;`
      : ``
  }
  ${
    !parentEnableGelGutters
      ? `width: calc(${
          (100 * columnsGroup) / parentColumnsGroup
        }%${negativeOffset});`
      : ``
  }
  
  ${
    gridStartOffsetGroup && gridStartOffsetGroup < parentColumnsGroup
      ? `margin-${dir === 'ltr' ? 'left' : 'right'}: ${startOffsetPercentage(
          parentColumnsGroup,
          gridStartOffsetGroup,
        )};`
      : ``
  }
  display: inline-block;
  vertical-align: top; 
`;
}; /* [1] */

const outerGridFallback = (
  dir,
  columnsGroup,
  marginsGroup,
  marginSize,
  enableGelGutters,
  gutterSize,
  gridStartOffset,
  gridStartOffsetGroup,
) => `
  ${marginsGroup ? `padding: 0 ${marginSize};` : ``}
  ${
    gridStartOffset && gridStartOffsetGroup < columnsGroup
      ? `margin-${dir === 'ltr' ? 'left' : 'right'}: ${startOffsetPercentage(
          columnsGroup,
          gridStartOffsetGroup,
        )}`
      : ``
  }`;

const gridFallbacks = ({
  item,
  dir,
  columns,
  margins,
  parentColumns,
  enableGelGutters,
  parentEnableGelGutters,
  gridStartOffset,
}) => {
  const isOuterGrid = !parentColumns;

  const selectedGroups = Object.keys(columns);
  return `
    
      ${selectedGroups
        .map(
          group => `
            ${mediaQuery({
              min: groups[group].min,
              max: groups[group].max,
              styles: `
              ${
                isOuterGrid
                  ? outerGridFallback(
                      dir,
                      columns[group],
                      margins[group],
                      groups[group].marginSize,
                      enableGelGutters,
                      groups[group].gutterSize,
                      gridStartOffset,
                      gridStartOffset[group],
                    )
                  : childrenFallback(
                      item,
                      dir,
                      columns[group],
                      margins[group],
                      groups[group].marginSize,
                      parentColumns[group],
                      parentEnableGelGutters,
                      groups[group].gutterSize,
                      gridStartOffset,
                      gridStartOffset[group],
                    )
              }`,
            })}
          `,
        )
        .join('')} 
    `;
};

const GridComponent = styled.div`
  ${gridFallbacks}
  @supports (display: grid) {
    ${gridMediaQueries}
    ${({ item }) =>
      item
        ? `display: block; width: initial; margin: 0;`
        : `display: grid; position: initial; width: initial; margin: 0;`}
  }
`;

const Grid = React.forwardRef(
  (
    {
      children,
      startOffset: gridStartOffset, // alias this prop to prevent it rendering as an element attribute e.g. <div startoffset="[object Object]">
      ...otherProps
    },
    ref,
  ) => {
    const renderChildren = () =>
      React.Children.map(children, child => {
        if (child) {
          const isNestedGridComponent = child.type === Grid;

          if (isNestedGridComponent) {
            return React.cloneElement(child, {
              parentColumns: otherProps.columns,
              parentEnableGelGutters: otherProps.enableGelGutters,
            });
          }
        }
        return child;
      });

    const renderGridComponent = () => (
      <GridComponent
        {...otherProps}
        gridStartOffset={gridStartOffset}
        ref={ref}
      >
        {renderChildren()}
      </GridComponent>
    );

    return renderGridComponent();
  },
);

Grid.propTypes = {
  children: node.isRequired,
  dir: oneOf(['ltr', 'rtl']),
  columns: shape({
    group1: number.isRequired,
    group2: number.isRequired,
    group3: number.isRequired,
    group4: number.isRequired,
    group5: number.isRequired,
  }).isRequired,
  enableGelGutters: bool,
  enableNegativeGelMargins: bool,
  margins: shape({
    group1: bool,
    group2: bool,
    group3: bool,
    group4: bool,
    group5: bool,
  }),
  startOffset: shape({
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
  item: bool,
  parentColumns: shape({
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
};

Grid.defaultProps = {
  dir: 'ltr',
  enableGelGutters: false,
  enableNegativeGelMargins: false,
  margins: {
    group1: false,
    group2: false,
    group3: false,
    group4: false,
    group5: false,
  },
  startOffset: {},
  item: false,
  parentColumns: null,
};

export default Grid;
