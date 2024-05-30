/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import { InputProps } from '../types';
import styles from './styles';

export default ({
  id,
  children,
<<<<<<< HEAD
}: PropsWithChildren<{ id: InputProps['id'] }>) => (
  <Text as="label" htmlFor={id} css={styles.fieldLabel}>
=======
  className,
}: PropsWithChildren<{
  id: InputProps['id'];
  className?: string;
}>) => (
  <Text as="label" className={className} htmlFor={id} css={styles.fieldLabel}>
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
    {children}
  </Text>
);
