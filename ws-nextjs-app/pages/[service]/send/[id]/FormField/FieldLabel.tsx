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
  isCheckbox,
}: PropsWithChildren<{
  id: InputProps['id'];
  className?: string;
  isCheckbox?: boolean;
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
        css={styles.fieldLabel}
      >
        {children}
      </Text>
    </div>
  );
};
