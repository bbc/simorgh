/** @jsx jsx */
import React, { useEffect, useRef, useContext } from 'react';
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
import InvalidMessageBox from '../FormField/InvalidMessageBox';
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
  const { handleSubmit, submitted, hasValidationErrors, attemptedSubmitCount } =
    useFormContext();

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hasValidationErrors) {
      // needs translations
      document.title = `Something Missing: ${title}`;
      ref.current?.focus();
    } else {
      document.title = title;
    }
  }, [title, hasValidationErrors, attemptedSubmitCount]);

  const hasAttemptedSubmit = attemptedSubmitCount > 0;

  const {
    translations: {
      ugc: { dataPolicyHeading = fallbackTranslations.dataPolicyHeading } = {},
    },
  } = useContext(ServiceContext);

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
          {hasAttemptedSubmit && hasValidationErrors && (
            <InvalidMessageBox
              id=""
              hasArrowStyle={false}
              messageCode={null}
              ref={ref}
              suffix={sectionTitle}
            />
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
