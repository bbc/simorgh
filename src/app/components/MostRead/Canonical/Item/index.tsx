/** @jsx jsx */
import React, { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import styles from './index.styles';
import {
  mostReadListGridProps,
  mostReadItemGridProps,
} from '../../utilities/gridProps';
import { MostReadItemProps, MostReadLinkProps } from '../../types';
import Grid from '../../../../legacy/components/Grid';

export const getParentColumns = (columnLayout: string) => {
  if (columnLayout !== 'oneColumn') {
    return mostReadListGridProps(columnLayout).columns;
  }
  return null;
};

// const getRankPaddingTop = size => (size === 'small' ? '0.2rem' : '0.375rem');
// const getRankPaddingStart = size =>
//   size === 'small' ? GEL_SPACING : GEL_SPACING_DBL;

// const StyledItem = styled.div`
//   padding-top: ${({ size }) => getRankPaddingTop(size)};

// ${({ dir, size }) =>
//   dir === 'ltr'
//     ? `padding-left: ${getRankPaddingStart(size)};`
//     : `padding-right: ${getRankPaddingStart(size)};`}

// ${({ dir }) =>
//   dir === 'ltr'
//     ? `padding-right: ${GEL_SPACING_DBL};`
//     : `padding-left: ${GEL_SPACING_DBL};`}

//   @supports (${grid}) {
//     ${({ dir }) => (dir === 'ltr' ? 'padding-right: 0;' : 'padding-left: 0;')}
//   }
// `;

// const TimestampWrapper = styled.div`
//   padding-top: ${GEL_SPACING};
// `;

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
    if (dir === 'ltr') {
      itemCss.push(styles.smallItemLtr);
    } else {
      itemCss.push(styles.smallItemRtl);
    }
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

// const ItemWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin: 0;
//   padding: 0;
// `;

// const StyledGrid = styled(Grid)`
//   position: relative;
//   padding-bottom: ${GEL_SPACING_TRPL};
// `;

// StyledGrid.defaultProps = {
//   role: 'listitem',
// };

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
