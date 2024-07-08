/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import { LiveRegionContextProvider } from '#app/components/LiveRegion/LiveRegionContext';
import LiveRegion from '#app/components/LiveRegion';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { useFormContext } from '../FormContext';
import { Field } from '../types';
import FormField from '../FormField';
import styles from './styles';
import Submit from '../SubmitButton';
import fallbackTranslations from '../fallbackTranslations';

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
  const {
    translations: {
      ugc: { dataPolicyHeading = fallbackTranslations.dataPolicyHeading } = {},
    },
  } = useContext(ServiceContext);

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
              <strong css={styles.privacyHeading}>{dataPolicyHeading}</strong>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: privacyNotice }}
                css={styles.privacyNotice}
              />
            </div>
          )}

          {!submitted && <Submit />}
          <LiveRegion />
        </LiveRegionContextProvider>
      </form>
    </>
  );
}
