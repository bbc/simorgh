/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import Grid from '../../../../legacy/psammead/psammead-grid/src';
import { mostReadListGridProps } from '../../../../legacy/containers/MostRead/utilities/gridProps';
import styles, {
  gridTemplateRows,
  multiColumnGridTemplateRows,
} from './index.styles';
import { MostReadBaseProps } from '../../types';

const MostReadList = ({
  numberOfItems,
  dir = 'ltr',
  columnLayout = 'multiColumn',
  children,
}: PropsWithChildren<MostReadBaseProps>) => {
  return (
    // @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags
    <Grid
      css={[
        styles[columnLayout],
        gridTemplateRows(numberOfItems),
        columnLayout !== 'oneColumn' &&
          multiColumnGridTemplateRows(numberOfItems),
      ]}
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
