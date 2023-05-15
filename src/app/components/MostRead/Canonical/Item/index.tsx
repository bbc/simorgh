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
  MostReadItemProps,
  MostReadLinkProps,
} from '../../types';
import Grid from '../../../../legacy/components/Grid';

export const getParentColumns = (columnLayout: ColumnLayout) => {
  if (columnLayout !== 'oneColumn') {
    return mostReadListGridProps(columnLayout).columns;
  }
  return null;
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

  const itemCss = [];
  itemCss.push(dir === 'ltr' ? styles.gridPaddingLtr : styles.gridPaddingRtl);

  if (size === 'small') {
    itemCss.push(styles.smallPaddingTop);
    itemCss.push(dir === 'ltr' ? styles.smallItemLtr : styles.smallItemRtl);
  } else {
    itemCss.push(styles.defaultPaddingTop);
    itemCss.push(styles.defaultItemPadding);
  }

  return (
    <div css={itemCss}>
      <a
        css={[styles.link, size === 'default' && styles.defaultLink]}
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
    // @ts-expect-error will review and fix this
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
