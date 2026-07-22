import { PropsWithChildren } from 'react';
import styles from './index.styles';

type ButtonLikeWrapperProps = {
  className?: string;
};

const ButtonLikeWrapper = ({
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonLikeWrapperProps>) => {
  return (
    <div css={styles.flexWrapper} className={className} {...rest}>
      {children}
    </div>
  );
};

export default ButtonLikeWrapper;
