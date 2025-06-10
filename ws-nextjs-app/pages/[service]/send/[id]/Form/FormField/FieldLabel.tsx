/** @jsx jsx */
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { useContext } from 'react';
import { InputProps } from '../../types';
import styles from './styles';
import fallbackTranslations from '../../fallbackTranslations';

type Props = {
  id?: InputProps['id'];
  forId: string;
  className?: string;
  labelText: string;
  required: boolean;
  useErrorTheme: boolean;
};

export default ({
  id,
  forId,
  labelText,
  className,
  required,
  useErrorTheme,
}: Props) => {
  const {
    translations: { ugc: { optional = fallbackTranslations.optional } = {} },
  } = useContext(ServiceContext);

  return (
    <Text
      as="label"
      className={className}
      htmlFor={forId}
      css={[styles.fieldLabel, useErrorTheme && styles.fieldLabelError]}
      dangerouslySetInnerHTML={{
        __html: required ? labelText : `${labelText} (${optional})`,
      }}
      {...(id && { id })}
    />
  );
};
