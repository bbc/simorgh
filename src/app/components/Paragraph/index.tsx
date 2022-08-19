/** @jsx jsx */

import React, { FC } from 'react';
import { jsx } from '@emotion/react';

import Text from '../Text';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const Paragraph: FC<Props> = ({ children, className }: Props) => (
  <Text as="p" className={className} size="bodyCopy">
    {children}
  </Text>
);

export default Paragraph;
