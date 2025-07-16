import { PropsWithChildren } from 'react';
import styles from './index.module.css';

type ButtonLikeWrapperProps = {
  className?: string;
};

const ButtonLikeWrapper = ({
  children,
  className,
}: PropsWithChildren<ButtonLikeWrapperProps>) => {
  return (
    <div className={[styles.flexWrapper, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
};

export default ButtonLikeWrapper;
