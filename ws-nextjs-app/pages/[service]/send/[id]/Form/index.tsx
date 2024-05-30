/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { useFormContext } from '../FormContext';
import { Field } from '../types';
import FormField from '../FormField';
import styles from './styles';
import Submit from '../SubmitButton';
import Loader from '../Loader';

<<<<<<< HEAD
export default function Form({ fields }: { fields: Field[] }) {
  const { handleSubmit, submissionError, submitted } = useFormContext();
=======
type Props = {
  title: string;
  sectionTitle: string;
  description: string;
  fields: Field[];
  privacyNotice: string;
};
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5

export default function Form({
  title,
  sectionTitle,
  description,
  fields,
  privacyNotice,
}: Props) {
  const { handleSubmit, submissionError, submitted } = useFormContext();
  const translation = 'Our data policy';
  const formFields = fields?.map(({ id, label, htmlType }) => (
    <FormField key={id} id={id} label={label} htmlType={htmlType} />
  ));

  return (
    <>
      <Heading
        level={1}
        id="content"
        tabIndex={-1}
        css={styles.heading}
        size="trafalgar"
      >
        {title}
      </Heading>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: description }}
        css={styles.description}
      />
      <Heading level={2} size="doublePica">
        {sectionTitle}
      </Heading>

      <form onSubmit={handleSubmit} noValidate>
        {formFields}
<<<<<<< HEAD
=======

        <strong // TODO: need translations for this, it doesn't come through from the api
          css={styles.privacyHeading}
        >
          {translation}
        </strong>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: privacyNotice }}
          css={styles.privacyNotice}
        />
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
        {!submitted ? <Submit /> : <Loader />}
      </form>
      {submissionError && (
        <div css={styles.submissionError}>
          {`Error: ${submissionError.status} - ${submissionError.code} - ${submissionError.message}`}
          <br />
          {`Recoverable: ${submissionError.isRecoverable}`}
        </div>
      )}
    </>
  );
}
