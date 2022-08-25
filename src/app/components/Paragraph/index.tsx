/** @jsx jsx */

import React, { FC } from 'react';
import { jsx } from '@emotion/react';

import { GelFontSize } from '../../interfaces';
import Text from '../Text';
import styles from './index.styled';

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
    css={styles.paragraph}
    size={size || 'bodyCopy'}
    {...htmlAttributes}
  >
    {children}
  </Text>
);

export default Paragraph;
