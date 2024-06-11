/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import { InputProps } from '../types';
import styles from './styles';

export default ({
  id,
  elementId,
  children,
  className,
}: PropsWithChildren<{
  id: InputProps['id'];
  elementId?: string;
  className?: string;
}>) => (
  <Text
    as="label"
    {...(elementId && { id: elementId })}
    className={className}
    htmlFor={id}
    css={styles.fieldLabel}
  >
    {children}
  </Text>
);
