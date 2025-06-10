/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Metadata from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './styles';
import { PageProps } from './types';
import FormManager from './Form';
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
  } = useContext(ServiceContext);

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
                <FormManager
                  initialScreen={initialScreen}
                  fields={fields}
                >
                  <FormManager.Context.Consumer>
                    {({ screen }) => {
                      switch (screen) {
                        case 'form':
                          return (
                            <FormManager.FormScreen
                              title={title}
                              description={description}
                              sectionTitle={sectionTitle}
                              privacyNotice={privacyNotice?.default}
                              fields={fields}
                            />
                          );
                        case 'uploading':
                          return <FormManager.UploadingScreen title={title} />;
                        case 'success':
                          return (
                            <FormManager.SuccessScreen
                              title={title}
                              replyEmailAddress={settings.replyEmailAddress}
                              retentionPeriod={settings.retentionPeriodDays}
                            />
                          );
                        case 'error':
                        default:
                          return <FormManager.ErrorScreen title={title} />;
                      }
                    }}
                  </FormManager.Context.Consumer>
                </FormManager>
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
