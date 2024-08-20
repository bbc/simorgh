/** @jsx jsx */

import React, { FC, HTMLAttributes, ForwardedRef, forwardRef } from 'react';
import { jsx } from '@emotion/react';

import { GelFontSize, FontVariant } from '../../models/types/theming';
import Text from '../Text';

interface Props extends HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
  fontVariant?: FontVariant;
  level: 1 | 2 | 3 | 4;
  size?: GelFontSize;
}

type Element = 'h1' | 'h2' | 'h3' | 'h4';

type Sizes = {
  h1: 'canon';
  h2: 'trafalgar';
  h3: 'doublePica';
  h4: 'greatPrimer';
};

const sizes: Sizes = {
  h1: 'canon',
  h2: 'trafalgar',
  h3: 'doublePica',
  h4: 'greatPrimer',
};

const Heading: FC<Props> = forwardRef(
  (
    {
      children,
      className,
      fontVariant = 'sansBold',
      level,
      size,
      ...htmlAttributes
    }: Props,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const element: Element = `h${level}`;

    return (
      <Text
        as={element}
        fontVariant={fontVariant}
        className={className}
        size={size || sizes[element]}
        css={{
          /*
           * margin: 0 is used to cancel the default spacing
           * above and below the component.
           * This is because we don't rely on one default spacing
           * for all heading elements.
           * Each use of this component will have to explicitly set
           * the spacings with the `css` prop.
           */
          margin: 0,
        }}
        {...(ref && { ref })}
        {...htmlAttributes}
      >
        {children}
      </Text>
    );
  },
);

export default Heading;
