import { PropsWithChildren, useContext } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import CallToActionLinkContext from '../CallToActionLinkContext';

type ButtonLikeWrapperProps = {
  className?: string;
};

const ButtonLikeWrapper = ({
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonLikeWrapperProps>) => {
  const { isGlowing } = useContext(CallToActionLinkContext);

  return (
    <div
      data-test-id="button-like-wrapper" // temp - for dev
      className={clsx(styles.flexWrapper, isGlowing && styles.glow, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ButtonLikeWrapper;
