/** @jsx jsx */
import React, { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import styles from './index.styles';
import {
  mostReadListGridProps,
  mostReadItemGridProps,
} from '../../utilities/gridProps';
import {
  ColumnLayout,
  Direction,
  MostReadItemProps,
  MostReadLinkProps,
  Size,
} from '../../types';
import Grid from '../../../../legacy/components/Grid';

export const getParentColumns = (columnLayout: ColumnLayout) => {
  return columnLayout !== 'oneColumn'
    ? mostReadListGridProps(columnLayout).columns
    : null;
};

const getItemCss = ({
  dir,
  size,
  href,
}: {
  dir: Direction;
  size: Size;
  href: string;
}) => {
  const itemCss = [];

  if (size === 'small') {
    itemCss.push(styles.smallPaddingTop);
    itemCss.push(dir === 'ltr' ? styles.smallItemLtr : styles.smallItemRtl);
  } else {
    itemCss.push(styles.defaultPaddingTop);
    itemCss.push(styles.defaultItemPadding);
  }

  if (href.includes('burmese')) {
    itemCss.push(styles.breakwordText);
    console.log(href);
  }
  itemCss.push(dir === 'ltr' ? styles.gridPaddingLtr : styles.gridPaddingRtl);

  return itemCss;
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
    <div css={getItemCss({ dir, size, href })} dir={dir}>
      <a
        css={[
          styles.link,
          size === 'default' && styles.defaultLink,
          styles.breakwordText,
        ]}
        href={href}
        onClick={clickTrackerHandler}
        className="focusIndicatorDisplayTableCell"
      >
        {title}
      </a>
      {children && <div css={styles.timestamp}>{children}</div>}
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
      css={styles.grid}
      {...mostReadItemGridProps(columnLayout)}
      parentColumns={getParentColumns(columnLayout)} // parentColumns is required here because on IE, this component would be rendered before it's parent therefore not receiving the parent's grid columns values so we have to explicitly pass it as a prop here so it works on IE
      dir={dir}
      as="li"
      ref={ref}
      role="listitem"
    >
      <div css={styles.item}>{children}</div>
    </Grid>
  ),
);
