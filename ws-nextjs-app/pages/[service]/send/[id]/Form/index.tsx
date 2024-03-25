/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useFormContext } from '../FormContext';
import { Field } from '../types';
import FormField from '../FormField';
import styles from './styles';

export default function Form({ fields }: { fields: Field[] }) {
  const { handleSubmit, submissionError } = useFormContext();

  const formFields = fields?.map(({ id, label, type, htmlType, textArea }) => (
    <FormField
      key={id}
      id={id}
      label={label}
      type={type}
      htmlType={htmlType}
      textArea={textArea}
    />
  ));

  return (
    <>
      <form onSubmit={handleSubmit}>
        {formFields}
        <input type="submit" />
      </form>
      {submissionError && (
        <div css={styles.submissionError}>
          {`${submissionError.message} - ${submissionError.status}`}
        </div>
      )}
    </>
  );
}
