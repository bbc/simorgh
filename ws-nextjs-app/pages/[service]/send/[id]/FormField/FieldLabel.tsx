/** @jsx jsx */
import { jsx } from '@emotion/react';
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
};

export default ({ id, forId, labelText, className, required }: Props) => (
  <Text
    as="label"
    className={className}
    htmlFor={forId}
    css={styles.fieldLabel}
    dangerouslySetInnerHTML={{
      __html: required ? labelText : `${labelText} ${optionalTranslation}`,
    }}
    {...(id && { id })}
  />
);
