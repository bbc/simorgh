import React, { FC } from 'react';

import Text from '../Text';

interface Props {
  className: string;
  children: JSX.Element | JSX.Element[];
  level: 1 | 2;
}

type Element = 'h1' | 'h2';

type Sizes = {
  h1: 'canon';
  h2: 'trafalgar';
};

type FontFamilyVariants = {
  h1: 'secondary';
  h2: 'primary';
};

const sizes: Sizes = {
  h1: 'canon',
  h2: 'trafalgar',
};

const fontWeights = {
  h1: 500,
  h2: 700,
};

const fontFamilyVariants: FontFamilyVariants = {
  h1: 'secondary',
  h2: 'primary',
};

const Heading: FC<Props> = ({ children, className, level = 1 }: Props) => {
  const element: Element = `h${level}`;
  const size = sizes[element];
  const fontWeight = fontWeights[element];
  const fontFamilyVariant = fontFamilyVariants[element];

  return (
    <Text
      as={element}
      fontFamilyVariant={fontFamilyVariant}
      className={className}
      size={size}
      css={{ fontWeight }}
    >
      {children}
    </Text>
  );
};

export default Heading;
