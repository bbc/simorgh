/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Metadata from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './styles';
import { PageProps } from './types';
import { FormContext, FormContextProvider } from './FormContext';
import Form from './Form';
import SuccessMessage from './SuccessMessage';
import GenericMessage from './GenericMessage';

const UGCPageLayout = ({ initialScreen = 'form', pageData }: PageProps) => {
  const { lang } = useContext(ServiceContext);
  const { title, description, sections, privacyNotice } = pageData;

  const { fields } = sections?.[0] ?? {};
  const sectionTitle = sections?.[0].sectionText?.title ?? '';

  const NO_JS_HEADING = 'Sorry, this page cannot be loaded.';
  const NO_JS_MESSAGE =
    'To load this page, please enable JavaScript, or try a different browser';

  const UPLOADING_HEADING = 'Uploading';
  const UPLOADING_MESSAGE = 'Please wait until it is finished.';

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
                          <Form
                            title={title}
                            description={description}
                            sectionTitle={sectionTitle}
                            privacyNotice={privacyNotice?.default}
                            fields={fields}
                          />
                        );
                      case 'uploading':
                        return (
                          <GenericMessage heading={UPLOADING_HEADING}>
                            {UPLOADING_MESSAGE}
                          </GenericMessage>
                        );
                      case 'success':
                        return <SuccessMessage />;
                      case 'error':
                      default:
                        return <div>Error</div>;
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
