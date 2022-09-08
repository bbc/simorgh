/** @jsx jsx */

import React, { FC, HTMLAttributes } from 'react';
import { jsx } from '@emotion/react';

import { FontVariant, GelFontSize } from '../../models/types/theming';
import Text from '../Text';

interface Props extends HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
  fontVariant?: FontVariant;
  size?: GelFontSize;
}

const Paragraph: FC<Props> = ({
  children,
  className,
  fontVariant,
  size,
  ...htmlAttributes
}: Props) => (
  <Text
    as="p"
    className={className}
    css={{
      /*
       * margin: 0 is used to cancel the default spacing
       * above and below the component.
       * This is because we don't rely on one default spacing
       * for all paragraph elements.
       * Each use of this component will have to explicitly set
       * the spacings with the `css` prop.
       */
      margin: 0,
    }}
    fontVariant={fontVariant}
    size={size || 'bodyCopy'}
    {...htmlAttributes}
  >
    {children}
  </Text>
);

export default Paragraph;
