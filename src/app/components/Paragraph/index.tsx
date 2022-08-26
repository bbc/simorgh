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
    size={size || 'bodyCopy'}
    {...htmlAttributes}
  >
    {children}
  </Text>
);

export default Paragraph;
