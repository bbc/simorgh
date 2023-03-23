/* eslint-disable react/prop-types */
import React from 'react';
import styles from './index.styles';

const VisuallyHiddenText = ({ as, children }) => {
  const Component = as || 'span';

  return <Component css={styles.visuallyHidden}>{children}</Component>;
};

export default VisuallyHiddenText;
