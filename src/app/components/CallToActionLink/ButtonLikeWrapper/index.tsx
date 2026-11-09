import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

type ButtonLikeWrapperProps = {
  className?: string;
};

const ButtonLikeWrapper = ({
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonLikeWrapperProps>) => {
  return (
    <div className={clsx(styles.flexWrapper, className)} {...rest}>
      {children}
    </div>
  );
};

export default ButtonLikeWrapper;
