import React from 'react';

const Grid = React.forwardRef(
  (
    {
      children,
      startOffset: gridStartOffset = {}, // alias this prop to prevent it rendering as an element attribute e.g. <div startoffset="[object Object]">
      dir = 'ltr',
      enableGelGutters = false,
      enableNegativeGelMargins = false,
      margins = {
        group1: false,
        group2: false,
        group3: false,
        group4: false,
        group5: false,
      },
      item = false,
      parentColumns = null,
      columns = {},
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
              parentColumns: columns,
              parentEnableGelGutters: enableGelGutters,
            });
          }
        }
        return child;
      });

    // Build grid classes based on columns configuration
    const gridClasses = [];
    
    if (item) {
      gridClasses.push('block w-auto m-0');
    } else {
      gridClasses.push('grid relative w-auto m-0');
    }

    // Add responsive grid column classes
    Object.entries(columns).forEach(([group, columnCount]) => {
      const groupNum = group.replace('group', '');
      gridClasses.push(`${group}:grid-cols-${columnCount}`);
      
      if (enableGelGutters) {
        gridClasses.push(`${group}:gap-gel-${groupNum}`);
      }
      
      if (margins[group]) {
        gridClasses.push(`${group}:px-gel-margin-${groupNum}`);
      }
      
      if (gridStartOffset[group]) {
        gridClasses.push(`${group}:col-start-${gridStartOffset[group]}`);
      }
    });

    // Fallback for non-grid support
    if (!item) {
      gridClasses.push('supports-no-grid:block');
    }

    // For non-grid fallback, use inline-block and calculated widths
    if (item && parentColumns) {
      Object.entries(columns).forEach(([group, columnCount]) => {
        const parentColumnCount = parentColumns[group];
        if (parentColumnCount) {
          const widthPercentage = (columnCount / parentColumnCount) * 100;
          gridClasses.push(`supports-no-grid:${group}:w-[${widthPercentage}%]`);
          gridClasses.push(`supports-no-grid:${group}:inline-block`);
          gridClasses.push(`supports-no-grid:${group}:align-top`);
        }
      });
    }

    return (
      <div
        {...otherProps}
        className={gridClasses.join(' ')}
        ref={ref}
      >
        {renderChildren()}
      </div>
    );
  },
);

export default Grid;
