/** @jsxImportSource @emotion/react */
import type { ReactNode } from 'react';
import styles, { GRID_AREAS } from './index.styles';

export { GRID_AREAS };

interface ActionGridProps {
  children: ReactNode;
}

export const ActionGrid = ({ children }: ActionGridProps) => (
  <div css={styles.actionGrid()}>{children}</div>
);
