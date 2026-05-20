import type { ReactNode } from 'react';

import styles from '../index.styles';

interface ActionGridProps {
  children: ReactNode;
}

const ActionGrid = ({ children }: ActionGridProps) => (
  <div css={styles.actionGrid}>{children}</div>
);

export default ActionGrid;
