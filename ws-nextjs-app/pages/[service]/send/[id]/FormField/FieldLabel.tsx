/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ForwardedRef, forwardRef } from 'react';
import Text from '#app/components/Text';
import { InputProps } from '../types';
import styles from './styles';

const optionalTranslation = '(optional)';

type Props = {
  id?: InputProps['id'];
  forId: string;
  className?: string;
  labelText: string;
  required: boolean;
  useErrorTheme: boolean;
};

const FieldLabel = forwardRef(
  (
    { id, forId, labelText, className, required, useErrorTheme }: Props,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    return (
      <Text
        as="label"
        className={className}
        htmlFor={forId}
        css={[styles.fieldLabel, useErrorTheme && styles.fieldLabelError]}
        dangerouslySetInnerHTML={{
          __html: required ? labelText : `${labelText} ${optionalTranslation}`,
        }}
        {...(id && { id })}
        {...(ref && { ref })}
      />
    );
  },
);

export default FieldLabel;
