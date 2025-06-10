/** @jsx jsx */
import React, { useEffect, useRef, useContext } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import { LiveRegionContextProvider } from '#app/components/LiveRegion/LiveRegionContext';
import LiveRegion from '#app/components/LiveRegion';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { useFormContext } from '..';
import { Field } from '../../types';
import FormField from '../FormField';
import styles from './styles';
import Submit from './SubmitButton';
import fallbackTranslations from '../../fallbackTranslations';
import ErrorSummaryBox from '../../MessageBox/ErrorSummaryBox';

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
  const { handleSubmit, submitted, validationErrors, attemptedSubmitCount } =
    useFormContext();

  const {
    translations: {
      ugc: {
        dataPolicyHeading = fallbackTranslations.dataPolicyHeading,
        validationRequired = fallbackTranslations.validationRequired,
      } = {},
    },
  } = useContext(ServiceContext);

  const ref = useRef<HTMLDivElement>(null);

  const hasAttemptedSubmit = attemptedSubmitCount > 0;
  const hasValidationErrors = validationErrors.length > 0;

  useEffect(() => {
    if (hasValidationErrors && hasAttemptedSubmit) {
      document.title = `${validationRequired}: ${title}`;
      ref.current?.focus();
    } else {
      document.title = title;
    }
  }, [
    title,
    hasValidationErrors,
    hasAttemptedSubmit,
    // refocuses on error summary box after every submission attempt
    attemptedSubmitCount,
    validationRequired,
  ]);

  const formFields = fields?.map(({ id, label, htmlType }) => (
    <FormField key={id} id={id} label={label} htmlType={htmlType} />
  ));

  const labelMap: Record<string, string> = {};
  fields?.forEach(({ id, label }) => {
    labelMap[id] = label;
  });

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
          {hasAttemptedSubmit && hasValidationErrors && (
            <ErrorSummaryBox ref={ref} labelMap={labelMap} />
          )}
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
