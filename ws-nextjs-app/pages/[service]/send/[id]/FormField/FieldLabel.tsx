/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import { InputProps } from '../types';
import styles from './styles';

const translation = '(optional)';
export default ({
  id,
  children,
  className,
  required,
}: PropsWithChildren<{
  id: InputProps['id'];
  className?: string;
  required: boolean;
}>) => (
  <Text as="label" className={className} htmlFor={id} css={styles.fieldLabel}>
    {required ? children : `${children} ${translation}`}
  </Text>
);
