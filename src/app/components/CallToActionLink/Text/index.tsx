import { PropsWithChildren, use } from 'react';
import clsx from 'clsx';
import Text from '#app/components/Text';
import CallToActionLinkContext from '../CallToActionLinkContext';
import styles from './index.module.scss';

type TextProps = {
  as?: string;
  className?: string;
  shouldUnderlineOnHoverFocus?: boolean;
};

export default ({
  as,
  children,
  className,
  shouldUnderlineOnHoverFocus,
}: PropsWithChildren<TextProps>) => {
  const { fontVariant, size } = use(CallToActionLinkContext);
  return (
    <Text
      as={as}
      size={size}
      fontVariant={fontVariant}
      className={clsx(
        styles.text,
        shouldUnderlineOnHoverFocus
          ? styles.underlineOnHoverFocus
          : styles.defaultTextStyles,
        className,
      )}
    >
      {children}
    </Text>
  );
};
