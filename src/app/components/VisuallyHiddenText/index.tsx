/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';

const VisuallyHiddenText = ({ children }: { children: React.ReactNode }) => {
  return <span css={styles.hiddenText}>{children}</span>;
};

export default VisuallyHiddenText;
