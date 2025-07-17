import { PropsWithChildren, use } from 'react';
import React from 'react';
import Grid from '../../../../legacy/psammead/psammead-grid/src';
import { mostReadListGridProps } from '../../utilities/gridProps';
import { MostReadBaseProps } from '../../types';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const MostReadList = ({
  numberOfItems,
  dir = 'ltr',
  columnLayout: initialColumnLayout = 'multiColumn',
  children,
}: PropsWithChildren<MostReadBaseProps>) => {
  const { service } = use(ServiceContext);
  const columnLayout =
    service === 'burmese' ? 'oneColumn' : initialColumnLayout;

  const getColumnClasses = () => {
    let classes = 'list-none m-0 p-0 grid-flow-col ';
    classes += `grid-rows-[repeat(${numberOfItems},auto)] `;
    
    if (columnLayout === 'multiColumn') {
      classes += `group-3:grid-rows-[repeat(${Math.ceil(numberOfItems / 2)},auto)] `;
      classes += 'group-5:grid-flow-row ';
    } else if (columnLayout === 'twoColumn') {
      classes += `group-3:grid-rows-[repeat(${Math.ceil(numberOfItems / 2)},auto)] `;
    }
    
    return classes;
  };

  return (
    // @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags
    <Grid
      className={getColumnClasses()}
      {...mostReadListGridProps(columnLayout)}
      dir={dir}
      numberOfItems={numberOfItems}
      as="ol"
      role="list"
    >
      {children}
    </Grid>
  );
};

export default MostReadList;
