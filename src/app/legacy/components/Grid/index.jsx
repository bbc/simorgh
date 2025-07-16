import React, { use } from 'react';
import GRID from '#psammead/psammead-grid/src';
import { ServiceContext } from '../../../contexts/ServiceContext';

const Grid = React.forwardRef((props, ref) => {
  const { dir } = use(ServiceContext);
  return <GRID dir={dir} {...props} {...ref} />;
});

const fourOfSixColumnsMaxWidthGroup4 = `30rem`;
const eightOfTwelveColumnsMaxWidthGroup5 = `30.6rem`;
const fiveOfSixColumnsMaxWidthScaleable = `83.33%`;
const fourOfSixColumnsMaxWidthScaleable = `66.67%`;

// Common grid layout classes
const gelGridMargin = "px-[1rem] group-2:px-[1rem] group-3:px-0 group-4:px-0 group-5:px-0";

const layoutGridItemSmall = `
  ${gelGridMargin}
  group-2:max-w-[${fourOfSixColumnsMaxWidthScaleable}]
  group-3:max-w-[${fiveOfSixColumnsMaxWidthScaleable}]
  group-4:max-w-[${fourOfSixColumnsMaxWidthGroup4}]
  group-5:max-w-[${eightOfTwelveColumnsMaxWidthGroup5}]
  supports-grid:max-w-none
`;

export const GelPageGrid = ({ children, ...props }) => (
  <div
    className="w-full group-4:mx-auto group-4:max-w-[1008px] group-5:mx-auto group-5:max-w-[1280px]"
    {...props}
  >
    <GRID
      enableGelGutters
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 20,
      }}
      {...props}
    >
      {children}
    </GRID>
  </div>
);

export const CPSPageGrid = ({ children, ...props }) => (
  <div className="group-4:mx-auto group-4:max-w-[1008px]">
    <GRID
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 8,
      }}
      enableGelGutters
      {...props}
    >
      {children}
    </GRID>
  </div>
);

export const GridWrapper = props => (
  <GelPageGrid
    {...props}
    enableGelGutters
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 20,
    }}
  />
);

export const GridItemSmall = ({ children, ...props }) => (
  <div className={layoutGridItemSmall} {...props}>
    <GRID
      item
      startOffset={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 2,
        group5: 5,
      }}
      columns={{
        group0: 6,
        group1: 6,
        group2: 4,
        group3: 5,
        group4: 4,
        group5: 8,
      }}
      {...props}
    >
      {children}
    </GRID>
  </div>
);

export const GridItemMedium = ({
  gridColumnStart = 5,
  gridSpan = 10,
  children,
  ...props
}) => (
  <GRID
    item
    margins={{
      group0: true,
      group1: true,
      group2: true,
      group3: true,
      group4: false,
      group5: false,
    }}
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: gridColumnStart,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 5,
      group4: 5,
      group5: gridSpan,
    }}
    {...props}
  >
    {children}
  </GRID>
);

export const GridItemMediumNoMargin = ({
  gridColumnStart = 5,
  gridSpan = 10,
  children,
  ...props
}) => (
  <GRID
    item
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: gridColumnStart,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 5,
      group4: 5,
      group5: gridSpan,
    }}
    {...props}
  >
    {children}
  </GRID>
);

export const GridItemLarge = ({ children, ...props }) => (
  <GRID
    item
    margins={{
      group0: true,
      group1: true,
      group2: true,
      group3: true,
      group4: false,
      group5: false,
    }}
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: 5,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 6,
      group5: 12,
    }}
    {...props}
  >
    {children}
  </GRID>
);

export const GridItemLargeNoMargin = ({ children, ...props }) => (
  <GRID
    item
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: 5,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 6,
      group5: 12,
    }}
    {...props}
  >
    {children}
  </GRID>
);

export const PopOutGridItemMedium = ({
  children,
  gridColumnStart = 1,
  gridSpan = 4,
  ...props
}) => (
  <div className="supports-grid:group-5:max-h-0 supports-grid:group-5:pt-1 supports-grid:group-5:mx-double">
    <GridItemMedium
      gridColumnStart={gridColumnStart}
      gridSpan={gridSpan}
      {...props}
    >
      {children}
    </GridItemMedium>
  </div>
);

export default Grid;
