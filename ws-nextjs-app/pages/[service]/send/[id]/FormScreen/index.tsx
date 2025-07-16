import React, { useEffect, useRef, use } from 'react';
import Heading from '#app/components/Heading';
import { LiveRegionContextProvider } from '#app/components/LiveRegion/LiveRegionContext';
import LiveRegion from '#app/components/LiveRegion';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { useFormContext } from '../FormContext';
import { Field } from '../types';
import FormField from '../FormField';
import Submit from '../SubmitButton';
import fallbackTranslations from '../fallbackTranslations';
import ErrorSummaryBox from '../MessageBox/ErrorSummaryBox';

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
  } = use(ServiceContext);

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
        className="focus:outline-none"
        size="trafalgar"
      >
        {title}
      </Heading>
      {description && (
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: description }}
          className="border-b border-grey-5 mb-8 font-sansRegular text-bodyCopy group-2:pb-4 group-2:mb-12 [&_p]:text-black [&_a]:text-blue-600 [&_a]:underline [&_a]:font-sansBold [&_a:hover]:text-blue-800 [&_a:focus]:text-blue-800"
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
            <div className="mt-8">
              <strong className="text-black font-sansBold text-longPrimer">{dataPolicyHeading}</strong>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: privacyNotice }}
                className="font-sansRegular text-longPrimer [&_p]:text-black [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800 [&_a:focus]:text-blue-800"
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
