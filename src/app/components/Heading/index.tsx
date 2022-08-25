/** @jsx jsx */

import React, { FC } from 'react';
import { jsx } from '@emotion/react';

import { GelFontSize, FontVariant } from '../../interfaces';
import Text from '../Text';

interface Props {
  className?: string;
  children: React.ReactNode;
  fontVariant?: FontVariant;
  level: 1 | 2 | 3;
  size?: GelFontSize;
}

type Element = 'h1' | 'h2' | 'h3';

type Sizes = {
  h1: 'canon';
  h2: 'trafalgar';
  h3: 'doublePica';
};

const sizes: Sizes = {
  h1: 'canon',
  h2: 'trafalgar',
  h3: 'doublePica',
};

const Heading: FC<Props> = ({
  children,
  className,
  fontVariant,
  level,
  size,
  ...htmlAttributes
}: Props) => {
  const element: Element = `h${level}`;

  return (
    <Text
      as={element}
      fontVariant={fontVariant}
      className={className}
      size={size || sizes[element]}
      {...htmlAttributes}
    >
      {children}
    </Text>
  );
};

export default Heading;
