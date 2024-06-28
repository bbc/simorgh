/** @jsx jsx */
import { PropsWithChildren, useContext } from 'react';
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { InputProps } from '../types';
import styles from './styles';
import fallbackTranslations from '../fallbackTranslations';

export default ({
  id,
  forId,
  children,
  className,
  required,
  useErrorTheme,
}: PropsWithChildren<{
  id?: InputProps['id'];
  forId: string;
  className?: string;
  required: boolean;
  useErrorTheme: boolean;
}>) => {
  const {
    translations: { ugc: { optional = fallbackTranslations.optional } = {} },
  } = useContext(ServiceContext);

  return (
    <Text
      as="label"
      {...(id && { id })}
      className={className}
      htmlFor={forId}
      css={[styles.fieldLabel, useErrorTheme && styles.fieldLabelError]}
    >
      {required ? children : `${children} (${optional})`}
    </Text>
  );
};
