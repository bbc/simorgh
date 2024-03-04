/** @jsx jsx */
/** @jsxRuntime classic */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import { ContainerProps } from '../types';
import styles from './index.styles';

const Container = ({ children }: PropsWithChildren<ContainerProps>) => {
  return (
    <div data-testid="liveLabelContainer" css={styles.liveLabelContainer}>
      {children}
    </div>
  );
};

export default Container;
