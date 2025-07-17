import React, { PropsWithChildren } from 'react';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import {
  mostReadListGridProps,
  mostReadItemGridProps,
} from '../../utilities/gridProps';
import {
  ColumnLayout,
  MostReadItemProps,
  MostReadLinkProps,
  Size,
} from '../../types';
import { Direction } from '../../../../models/types/global';
import Grid from '../../../../legacy/components/Grid';

export const getParentColumns = (columnLayout: ColumnLayout) => {
  return columnLayout !== 'oneColumn'
    ? mostReadListGridProps(columnLayout).columns
    : null;
};

const getItemClasses = ({ dir, size }: { dir: Direction; size: Size }) => {
  let classes = '';

  if (size === 'small') {
    classes += 'pt-[0.2rem] ';
    classes += dir === 'ltr' ? 'pl-half pr-full ' : 'pl-full pr-half ';
  } else {
    classes += 'pt-[0.375rem] ';
    classes += 'px-double ';
  }

  // Grid support padding
  classes += dir === 'ltr' ? 'supports-[display:grid]:pr-0' : 'supports-[display:grid]:pl-0';

  return classes;
};

export const MostReadLink = ({
  dir,
  title,
  href,
  children,
  size,
  eventTrackingData,
}: PropsWithChildren<MostReadLinkProps>) => {
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  return (
    <div className={getItemClasses({ dir, size })} dir={dir}>
      <a
        className={`text-pica font-serif-medium static text-ebon no-underline inline-block hover:underline focus:underline before:bottom-0 before:content-[''] before:left-0 before:overflow-hidden before:absolute before:right-0 before:top-0 before:whitespace-nowrap before:z-10 ${size === 'default' ? 'group-2:text-greatPrimer' : ''}`}
        href={href}
        {...clickTrackerHandler}
      >
        {title}
      </a>
      {children && <div className="pt-full">{children}</div>}
    </div>
  );
};

export const MostReadItemWrapper = React.forwardRef(
  (
    { dir, children, columnLayout }: PropsWithChildren<MostReadItemProps>,
    ref,
  ) => (
    // @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags
    <Grid
      className="relative pb-triple"
      {...mostReadItemGridProps(columnLayout)}
      parentColumns={getParentColumns(columnLayout)} // parentColumns is required here because on IE, this component would be rendered before it's parent therefore not receiving the parent's grid columns values so we have to explicitly pass it as a prop here so it works on IE
      dir={dir}
      as="li"
      ref={ref}
      role="listitem"
    >
      <div className="flex flex-row m-0 p-0">{children}</div>
    </Grid>
  ),
);
