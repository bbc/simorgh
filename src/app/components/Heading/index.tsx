import React, { FC, HTMLAttributes, ForwardedRef, forwardRef } from 'react';

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
    
    // Combine margin-0 with any additional className
    const combinedClassName = ['m-0', className].filter(Boolean).join(' ');
    
    return (
      <Text
        as={element}
        fontVariant={fontVariant}
        className={combinedClassName}
        size={size || sizes[element]}
        {...(ref && { ref })}
        {...htmlAttributes}
      >
        {children}
      </Text>
    );
  },
);

export default Heading;
