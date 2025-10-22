import { PropsWithChildren } from 'react';
import styles from './index.styles';

type ButtonLikeWrapperProps = {
  className?: string;
};

const ButtonLikeWrapper = ({
  children,
  className,
}: PropsWithChildren<ButtonLikeWrapperProps>) => {
  return (
    <div css={styles.flexWrapper} className={className}>
      {children}
    </div>
  );
};

export default ButtonLikeWrapper;
