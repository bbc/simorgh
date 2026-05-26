import { use } from 'react';

import Metadata from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import ClosedScreen from './ClosedScreen';
import ErrorScreen from './ErrorScreen';
import { FormContext, FormContextProvider } from './FormContext';
import FormScreen from './FormScreen';
import fallbackTranslations from './fallbackTranslations';
import GenericMessage from './GenericMessage';
import SuccessScreen from './SuccessScreen';
import styles from './styles';
import { PageProps } from './types';
import UploadingScreen from './UploadingScreen';

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
      <div css={styles.background} />
      <div css={styles.grid}>
        <div css={styles.primaryColumn}>
          <main role="main" css={styles.mainContent}>
            <noscript>
              <GenericMessage heading={noJsHeading}>
                {noJsDescription}
              </GenericMessage>
            </noscript>
            <div css={styles.screenContainer}>
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
