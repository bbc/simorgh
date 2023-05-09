/** @jsx jsx */
import { PropsWithChildren, FC } from 'react';
import { jsx } from '@emotion/react';
import Grid from '../../../../legacy/psammead/psammead-grid/src';
import { mostReadListGridProps } from '../../../../legacy/containers/MostRead/utilities/gridProps';
import styles from './index.styles';
import { MostReadBaseProps } from '../../types';

const MostReadList: FC<PropsWithChildren<MostReadBaseProps>> = ({
  numberOfItems,
  dir = 'ltr',
  columnLayout = 'multiColumn',
  children,
}: PropsWithChildren<MostReadBaseProps>) => {
  const role = columnLayout === 'oneColumn' ? 'list' : null;
  return (
    // @ts-expect-error will review and fix this
    <Grid
      css={styles[columnLayout]}
      {...mostReadListGridProps(columnLayout)}
      dir={dir}
      numberOfItems={numberOfItems}
      as="ol"
      role={role}
    >
      {children}
    </Grid>
  );
};

export default MostReadList;
