/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/react';
import styles from './styles';
import {
  PageProps,
  OnChangeInputName,
  OnChangeInputValue,
  Field,
} from './types';
import FormField from './FormField';
import Submit, { handleSubmit } from './SubmitButton';

const getInitialFormState = (fields: Field[]) =>
  fields.reduce((acc, field) => ({ ...acc, [field.id]: null }), {});

const UGCPageLayout = ({ pageData }: PageProps) => {
  const {
    data: { title, description, sections },
  } = pageData;

  const firstSection = sections[0];

  const initialFormState = getInitialFormState(firstSection.fields);

  const [, setFormState] = useState(initialFormState);

  const handleChange = (name: OnChangeInputName, value: OnChangeInputValue) => {
    setFormState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const fields = firstSection.fields.map(({ id, label, htmlType }) => (
    <FormField
      key={id}
      id={id}
      label={label}
      htmlType={htmlType}
      onChange={handleChange}
    />
  ));

  return (
    <div css={styles.grid}>
      <div css={styles.primaryColumn}>
        <main css={styles.mainContent} role="main">
          <h1>{title}</h1>
          <div>{description}</div>
          <form onSubmit={handleSubmit}>
            {fields}
            <Submit />
          </form>
        </main>
      </div>
    </div>
  );
};

export default UGCPageLayout;
