import { use } from 'react';
import Metadata from '#app/components/Metadata';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles, { buildImageBackground, fallbackBackground } from './styles';
import { PageProps } from './types';
import { FormContext, FormContextProvider } from './FormContext';
import FormScreen from './FormScreen';
import SuccessScreen from './SuccessScreen';
import ErrorScreen from './ErrorScreen';
import UploadingScreen from './UploadingScreen';
import GenericMessage from './GenericMessage';
import fallbackTranslations from './fallbackTranslations';
import ClosedScreen from './ClosedScreen';
import SignInRequiredScreen from './SignInRequiredScreen';

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
  const { isSignedIn } = use(AccountContext);

  const {
    title,
    description,
    sections,
    privacyNotice,
    campaignStatus,
    closingTime,
    settings,
  } = pageData;

  const { pageBackgroundTemplateUrl } = settings;

  const hasBackgroundImage = Boolean(pageBackgroundTemplateUrl);

  const background = pageBackgroundTemplateUrl
    ? buildImageBackground(pageBackgroundTemplateUrl)
    : fallbackBackground;

  const fields = sections?.flatMap(section => section.fields ?? []) ?? [];
  const openCampaignContent =
    settings.signinRequired && !isSignedIn ? (
      <SignInRequiredScreen />
    ) : (
      <FormContextProvider
        initialScreen={initialScreen}
        fields={fields}
        signinRequired={settings.signinRequired}
      >
        <FormContext.Consumer>
          {({ screen }) => {
            switch (screen) {
              case 'form':
                return (
                  <FormScreen
                    title={title}
                    description={description}
                    privacyNotice={privacyNotice?.default}
                    sections={sections}
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
    );

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
      <div
        data-testid="ugc-page-background"
        css={[
          styles.background(background),
          hasBackgroundImage && styles.backgroundFixed,
        ]}
      />
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
                openCampaignContent
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
