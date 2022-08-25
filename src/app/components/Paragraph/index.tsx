/** @jsx jsx */

import React, { FC } from 'react';
import { jsx } from '@emotion/react';

import { GelFontSize } from '../../interfaces';
import Text from '../Text';

interface Props {
  className?: string;
  children?: React.ReactNode;
  size?: GelFontSize;
}

const Paragraph: FC<Props> = ({
  children,
  className,
  size,
  ...htmlAttributes
}: Props) => (
  <Text
    as="p"
    className={className}
    size={size || 'bodyCopy'}
    {...htmlAttributes}
  >
    {children}
  </Text>
);

export default Paragraph;
