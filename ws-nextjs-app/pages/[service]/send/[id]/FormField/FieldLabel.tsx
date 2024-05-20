/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import { InputProps } from '../types';
import styles from './styles';

export default ({
  id,
  children,
  className,
}: PropsWithChildren<{
  id: InputProps['id'];
  className?: string;
}>) => (
  <Text as="label" className={className} htmlFor={id} css={styles.fieldLabel}>
    {children}
  </Text>
);
