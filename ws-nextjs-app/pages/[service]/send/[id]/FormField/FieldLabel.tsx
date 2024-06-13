/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import { InputProps } from '../types';
import styles from './styles';

const optionalTranslation = '(optional)';
export default ({
  id,
  forId,
  children,
  className,
  required,
}: PropsWithChildren<{
  id?: InputProps['id'];
  forId: string;
  className?: string;
  required: boolean;
}>) => (
  <Text
    as="label"
    {...(id && { id })}
    className={className}
    htmlFor={forId}
    css={styles.fieldLabel}
  >
    {required ? children : `${children} ${optionalTranslation}`}
  </Text>
);
