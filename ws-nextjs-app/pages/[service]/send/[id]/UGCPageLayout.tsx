/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Metadata from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './styles';
import { PageProps } from './types';
import { FormContext, FormContextProvider } from './FormContext';
import Form from './Form';
import Uploading from './Uploading';

const UGCPageLayout = ({ pageData }: PageProps) => {
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
      <div css={styles.background}>
        <div css={styles.grid}>
          <div css={styles.primaryColumn}>
            <main css={styles.mainContent}>
              <FormContextProvider fields={fields}>
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
                        return <Uploading />;
                      default:
                        return null;
                    }
                  }}
                </FormContext.Consumer>
              </FormContextProvider>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default UGCPageLayout;
