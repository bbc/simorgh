/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import { InputProps } from '../types';
import styles from './styles';

export default ({
  id,
  forId,
  children,
  className,
}: PropsWithChildren<{
  id?: InputProps['id'];
  forId: string;
  className?: string;
}>) => (
  <Text
    as="label"
    {...(id && { id })}
    className={className}
    htmlFor={forId}
    css={styles.fieldLabel}
  >
    {children}
  </Text>
);
