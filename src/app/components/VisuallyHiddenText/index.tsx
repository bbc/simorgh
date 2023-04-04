/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren } from 'react';
import styles from './index.styles';

const VisuallyHiddenText = ({ children }: PropsWithChildren) => {
  return <span css={styles.hiddenText}>{children}</span>;
};

export default VisuallyHiddenText;
