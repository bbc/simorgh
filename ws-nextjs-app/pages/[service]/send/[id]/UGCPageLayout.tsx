/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Metadata from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './styles';
import { PageProps } from './types';
import { FormContext, FormContextProvider } from './FormContext';
import FormScreen from './FormScreen';
import SuccessScreen from './SuccessScreen';
import ErrorScreen from './ErrorScreen';
import UploadingScreen from './UploadingScreen';
import GenericMessage from './GenericMessage';

const NO_JS_HEADING = 'Sorry, this page cannot be loaded.';
const NO_JS_MESSAGE =
  'To load this page, please enable JavaScript, or try a different browser';

const UGCPageLayout = ({ initialScreen = 'form', pageData }: PageProps) => {
  const { lang } = useContext(ServiceContext);
  const { title, description, sections, privacyNotice } = pageData;

  const { fields } = sections?.[0] ?? {};
  const sectionTitle = sections?.[0].sectionText?.title ?? '';
  return (
    <>
      <Metadata
        title={title}
        lang={lang}
        description="Test UGC Form"
        openGraphType="website"
        hasAmpPage={false}
      />
      <div css={styles.background} />
      <div css={styles.grid}>
        <div css={styles.primaryColumn}>
          <main role="main" css={styles.mainContent}>
            <noscript>
              <GenericMessage heading={NO_JS_HEADING}>
                {NO_JS_MESSAGE}
              </GenericMessage>
            </noscript>
            <div css={styles.screenContainer}>
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
                        return <SuccessScreen title={title} />;
                      case 'error':
                      default:
                        return <ErrorScreen title={title} />;
                    }
                  }}
                </FormContext.Consumer>
              </FormContextProvider>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UGCPageLayout;
