import React, { FC } from 'react';

import Text from '../Text';

interface Props {
  className: string;
  children: JSX.Element | JSX.Element[];
}

const Paragraph: FC<Props> = ({ children, className }: Props) => (
  <Text as="p" className={className} size="bodyCopy">
    {children}
  </Text>
);

export default Paragraph;
