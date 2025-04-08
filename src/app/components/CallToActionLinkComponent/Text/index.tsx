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
  overrideBottomBorder?: boolean;
};

const Text = ({
  as,
  size,
  fontVariant,
  children,
  className,
  overrideBottomBorder,
}: PropsWithChildren<TextProps>) => {
  return (
    <TEXT
      as={as}
      size={size}
      fontVariant={fontVariant}
      css={[
        styles.text,
        overrideBottomBorder
          ? styles.underlineOnHoverFocus
          : styles.bottomBorder,
      ]}
      className={className}
    >
      {children}
    </TEXT>
  );
};

export default Text;
