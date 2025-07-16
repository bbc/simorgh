import React, { use } from 'react';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { InputProps } from '../types';
import fallbackTranslations from '../fallbackTranslations';

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
  } = use(ServiceContext);

  return (
    <Text
      as="label"
      className={`${className} block font-sansBold text-bodyCopy mb-2 ${useErrorTheme ? 'text-error-core' : ''}`}
      htmlFor={forId}
      dangerouslySetInnerHTML={{
        __html: required ? labelText : `${labelText} (${optional})`,
      }}
      {...(id && { id })}
    />
  );
};
