/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import { LiveRegionContextProvider } from '#app/components/LiveRegion/LiveRegionContext';
import LiveRegion from '#app/components/LiveRegion';
import { useFormContext } from '../FormContext';
import { Field } from '../types';
import FormField from '../FormField';
import styles from './styles';
import Submit from '../SubmitButton';
import Loader from '../Loader';

const PRIVACY_POLICY_HEADER_TRANSLATION = 'Our data policy';

type Props = {
  title: string;
  sectionTitle: string;
  description: string;
  fields: Field[];
  privacyNotice: string;
};

export default function FormScreen({
  title,
  sectionTitle,
  description,
  fields,
  privacyNotice,
}: Props) {
  const { handleSubmit, submitted } = useFormContext();

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
      {description && (
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: description }}
          css={styles.description}
        />
      )}
      {sectionTitle && (
        <Heading level={2} size="doublePica">
          {sectionTitle}
        </Heading>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <LiveRegionContextProvider>
          {formFields}

          {privacyNotice && (
            <div css={styles.privacyContainer}>
              <strong // TODO: need translations for this, it doesn't come through from the api
                css={styles.privacyHeading}
              >
                {PRIVACY_POLICY_HEADER_TRANSLATION}
              </strong>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: privacyNotice }}
                css={styles.privacyNotice}
              />
            </div>
          )}

          {!submitted ? <Submit /> : <Loader />}
          <LiveRegion />
        </LiveRegionContextProvider>
      </form>
    </>
  );
}
