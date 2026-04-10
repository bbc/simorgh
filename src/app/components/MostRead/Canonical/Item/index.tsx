import { forwardRef, PropsWithChildren } from 'react';
import { SerializedStyles, Theme } from '@emotion/react';
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
  Size,
} from '../../types';
import { Direction } from '../../../../models/types/global';
import Grid from '../../../../legacy/components/Grid';

export const getParentColumns = (columnLayout: ColumnLayout) => {
  return columnLayout !== 'oneColumn'
    ? mostReadListGridProps(columnLayout).columns
    : null;
};

const getItemCss = ({ dir, size }: { dir: Direction; size: Size }) => {
  const itemCss: Array<(_theme: Theme) => SerializedStyles> = [];

  if (size === 'small') {
    itemCss.push(styles.smallPaddingTop);
    itemCss.push(dir === 'ltr' ? styles.smallItemLtr : styles.smallItemRtl);
  } else {
    itemCss.push(styles.defaultPaddingTop);
    itemCss.push(styles.defaultItemPadding);
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
  id,
  position,
  eventTrackingData,
}: PropsWithChildren<MostReadLinkProps>) => {
  const positionIndex =
    typeof position === 'string' ? parseInt(position, 10) : position;

  const eventTrackingDataExtended = {
    ...eventTrackingData,
    itemTracker: {
      ...eventTrackingData?.itemTracker,
      type: 'most-read-promo',
      text: title,
      position: positionIndex,
      resourceId: id || href,
    },
  };

  const clickTrackerHandler = useClickTrackerHandler(eventTrackingDataExtended);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <div css={getItemCss({ dir, size }) as any[]} dir={dir}>
      <a
        css={[styles.link, size === 'default' && styles.defaultLink]}
        href={href}
        {...clickTrackerHandler}
      >
        {title}
      </a>
      {children && <div css={styles.timestamp}>{children}</div>}
    </div>
  );
};

export const MostReadItemWrapper = forwardRef(
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
