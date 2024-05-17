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
  isCheckbox,
  withPTag,
}: PropsWithChildren<{
  id: InputProps['id'];
  className?: string;
  isCheckbox?: boolean;
  withPTag?: boolean;
}>) => {
  return isCheckbox ? (
    <Text as="label" className={className} htmlFor={id} css={styles.fieldLabel}>
      {children}
    </Text>
  ) : (
    <div>
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
    </div>
  );
};
