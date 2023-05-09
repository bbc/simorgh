/** @jsx jsx */
import { PropsWithChildren, FC } from 'react';
import { jsx } from '@emotion/react';
import Grid from '../../../legacy/psammead/psammead-grid/src';
import { mostReadListGridProps } from '../../../legacy/containers/MostRead/utilities/gridProps';
import styles from './index.styles';

interface MostReadListProps {
  dir: 'rtl' | 'ltr';
  columnLayout?: 'oneColumn' | 'twoColumn' | 'multiColumn';
  numberOfItems: number;
}

const MostReadList: FC<PropsWithChildren<MostReadListProps>> = ({
  numberOfItems,
  dir,
  columnLayout = 'oneColumn',
  children,
}: PropsWithChildren<MostReadListProps>) => {
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
