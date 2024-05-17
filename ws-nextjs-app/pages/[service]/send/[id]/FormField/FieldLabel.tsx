/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx, Theme } from '@emotion/react';
import Text from '#app/components/Text';
import { InputProps } from '../types';
import styles from './styles';

export default ({
  id,
  children,
  className,
  withPTag,
}: PropsWithChildren<{
  id: InputProps['id'];
  className?: string;
  withPTag?: boolean;
}>) => (
  <Text
    as="label"
    className={className}
    htmlFor={id}
    css={({ spacings }: Theme) =>
      withPTag
        ? styles.fieldLabel
        : [styles.fieldLabel, `marginBottom: ${spacings.FULL}rem`]
    }
  >
    {children}
  </Text>
);
