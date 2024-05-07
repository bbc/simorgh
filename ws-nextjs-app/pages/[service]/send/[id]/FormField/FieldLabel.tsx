import React, { PropsWithChildren } from 'react';
import Text from '#app/components/Text';
import { InputProps } from '../types';

export default ({
  id,
  children,
}: PropsWithChildren<{ id: InputProps['id'] }>) => (
  <Text as="label" htmlFor={id}>
    {children}
  </Text>
);
