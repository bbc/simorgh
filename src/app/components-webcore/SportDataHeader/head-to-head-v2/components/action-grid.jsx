
import styles, { GRID_AREAS } from './index.styles';

export { GRID_AREAS };

export const ActionGrid = ({ children }) => (
  <div css={styles.actionGrid()}>{children}</div>
);
