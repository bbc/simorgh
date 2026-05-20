import { type PropsWithChildren, use } from 'react';

import { ServiceContext } from '../../../../contexts/ServiceContext';
import Grid from '../../../../legacy/psammead/psammead-grid/src';
import type { MostReadBaseProps } from '../../types';
import { mostReadListGridProps } from '../../utilities/gridProps';
import * as styles from './index.styles';

const MostReadList = ({
  numberOfItems,
  dir = 'ltr',
  columnLayout: initialColumnLayout = 'multiColumn',
  children,
}: PropsWithChildren<MostReadBaseProps>) => {
  const { service } = use(ServiceContext);
  const columnLayout =
    service === 'burmese' ? 'oneColumn' : initialColumnLayout;

  return (
    // @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags
    <Grid
      css={[
        styles[columnLayout],
        styles.gridTemplateRows(numberOfItems),
        columnLayout !== 'oneColumn' &&
          styles.multiColumnGridTemplateRows(numberOfItems),
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
