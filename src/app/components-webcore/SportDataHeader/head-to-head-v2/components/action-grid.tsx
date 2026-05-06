/** @jsxImportSource @emotion/react */
import type { ReactNode } from 'react';
import styles, { GRID_AREAS } from './index.styles';

// import { GROUP_3, createSize } from '@bbc/web-gel-foundations';

interface ActionGridProps {
  children: ReactNode;
}

export const ActionGrid = ({ children }: ActionGridProps) => (
  <div css={styles.actionGrid()}>{children}</div>
);
