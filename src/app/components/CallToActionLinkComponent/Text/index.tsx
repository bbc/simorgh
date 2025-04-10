/** @jsx jsx */

import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import TEXT from '#app/components/Text';
import { FontVariant, GelFontSize } from '../../../models/types/theming';
import styles from './index.styles';

type TextProps = {
  as?: string;
  fontVariant?: FontVariant;
  size?: GelFontSize;
  className?: string;
  overrideInteractionStyles?: boolean;
};

const Text = ({
  as,
  size,
  fontVariant,
  children,
  className,
  overrideInteractionStyles,
}: PropsWithChildren<TextProps>) => {
  return (
    <TEXT
      as={as}
      size={size}
      fontVariant={fontVariant}
      css={[
        styles.text,
        overrideInteractionStyles
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
