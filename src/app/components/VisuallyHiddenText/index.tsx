import React from 'react';
import styles from './index.styles';

interface VisuallyHiddenTextProps {
  as?: React.ElementType;
  children?: React.ReactNode;
}

const VisuallyHiddenText = ({ as, children }: VisuallyHiddenTextProps) => {
  const Component = as || 'span';

  return <Component css={styles.visuallyHidden}>{children}</Component>;
};

export default VisuallyHiddenText;
