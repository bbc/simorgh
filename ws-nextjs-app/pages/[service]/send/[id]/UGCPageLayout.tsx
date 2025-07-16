import React, { use } from 'react';
import Metadata from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { PageProps } from './types';
import { FormContext, FormContextProvider } from './FormContext';
import FormScreen from './FormScreen';
import SuccessScreen from './SuccessScreen';
import ErrorScreen from './ErrorScreen';
import UploadingScreen from './UploadingScreen';
import GenericMessage from './GenericMessage';
import fallbackTranslations from './fallbackTranslations';
import ClosedScreen from './ClosedScreen';

const UGCPageLayout = ({ initialScreen = 'form', pageData }: PageProps) => {
  const {
    lang,
    translations: {
      ugc: {
        closedHeading = fallbackTranslations.closedHeading,
        noJsHeading = fallbackTranslations.noJsHeading,
        noJsDescription = fallbackTranslations.noJsDescription,
      } = {},
    },
  } = use(ServiceContext);

  const {
    title,
    description,
    sections,
    privacyNotice,
    campaignStatus,
    closingTime,
    settings,
  } = pageData;

  const { fields } = sections?.[0] ?? {};
  const sectionTitle = sections?.[0].sectionText?.title ?? '';

  const metadataTitle =
    campaignStatus === 'open' ? title : `${closedHeading}: ${title}`;

  return (
    <>
      <Metadata
        title={metadataTitle}
        lang={lang}
        description={description}
        openGraphType="website"
        hasAmpPage={false}
      />
      <div className="hidden group-3:block absolute inset-0 bg-gradient-to-b from-[#A20219] via-[#180109] to-[#180109]" />
      <div className="relative group-3:max-w-[63rem] group-3:mx-auto group-3:grid group-3:grid-cols-12 group-3:p-8 group-4:gap-x-4">
        <div className="col-span-12 group-4:col-span-8 group-4:pb-16">
          <main role="main" className="bg-white outline-1 outline-transparent p-8 px-4 group-1:p-12 group-1:px-4 group-2:p-12 group-2:px-8">
            <noscript>
              <GenericMessage heading={noJsHeading}>
                {noJsDescription}
              </GenericMessage>
            </noscript>
            <div className="no-js:hidden">
              {campaignStatus === 'open' ? (
                <FormContextProvider
                  initialScreen={initialScreen}
                  fields={fields}
                >
                  <FormContext.Consumer>
                    {({ screen }) => {
                      switch (screen) {
                        case 'form':
                          return (
                            <FormScreen
                              title={title}
                              description={description}
                              sectionTitle={sectionTitle}
                              privacyNotice={privacyNotice?.default}
                              fields={fields}
                            />
                          );
                        case 'uploading':
                          return <UploadingScreen title={title} />;
                        case 'success':
                          return (
                            <SuccessScreen
                              title={title}
                              replyEmailAddress={settings.replyEmailAddress}
                              retentionPeriod={settings.retentionPeriodDays}
                            />
                          );
                        case 'error':
                        default:
                          return <ErrorScreen title={title} />;
                      }
                    }}
                  </FormContext.Consumer>
                </FormContextProvider>
              ) : (
                <ClosedScreen title={title} closingTime={closingTime} />
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UGCPageLayout;
