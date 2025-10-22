import { PropsWithChildren, use } from 'react';
import Text from '#app/components/Text';
import CallToActionLinkContext from '../CallToActionLinkContext';
import styles from './index.styles';

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
      css={[
        styles.text,
        shouldUnderlineOnHoverFocus
          ? styles.underlineOnHoverFocus
          : styles.defaultTextStyles,
      ]}
      className={className}
    >
      {children}
    </Text>
  );
};
