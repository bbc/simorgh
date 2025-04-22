/** @jsx jsx */

import { PropsWithChildren, useContext } from 'react';
import { jsx } from '@emotion/react';
import TEXT from '#app/components/Text';
import CallToActionLinkContext from '../CallToActionLinkContext';
import styles from './index.styles';

type TextProps = {
  as?: string;
  className?: string;
  shouldUnderlineOnHoverFocus?: boolean;
};

const Text = ({
  as,
  children,
  className,
  shouldUnderlineOnHoverFocus,
}: PropsWithChildren<TextProps>) => {
  const { fontVariant, size } = useContext(CallToActionLinkContext);
  return (
    <TEXT
      as={as}
      size={size || 'pica'}
      fontVariant={fontVariant || 'sansBold'}
      css={[
        styles.text,
        shouldUnderlineOnHoverFocus
          ? styles.underlineOnHoverFocus
          : styles.defaultTextStyles,
      ]}
      className={className}
    >
      {children}
    </TEXT>
  );
};

export default Text;
