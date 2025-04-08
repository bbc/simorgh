/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import styles from './index.styles';

type FlexWrapperProps = {
  className?: string;
};

const FlexWrapper = ({
  children,
  className,
}: PropsWithChildren<FlexWrapperProps>) => {
  return (
    <div css={styles.flexWrapper} className={className}>
      {children}
    </div>
  );
};

export default FlexWrapper;
