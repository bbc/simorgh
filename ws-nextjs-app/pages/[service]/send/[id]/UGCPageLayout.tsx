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
import SuccessMessage from './SuccessMessage';

const UGCPageLayout = ({ initialScreen = 'form', pageData }: PageProps) => {
  const { lang } = useContext(ServiceContext);
  const { title, description, sections } = pageData;

  const { fields } = sections?.[0] ?? {};

  return (
    <>
      <Metadata
        title="Test UGC Form"
        lang={lang}
        description="Test UGC Form"
        openGraphType="website"
        hasAmpPage={false}
      />
<<<<<<< HEAD
      <div css={styles.grid}>
        <div css={styles.primaryColumn}>
          <main css={styles.mainContent}>
            <Heading level={1}>{title}</Heading>
            <div
              // TODO: This is a security risk, we should sanitize the HTML
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <FormContextProvider fields={fields}>
              <Form fields={fields} />
=======
      <div css={styles.background} />
      <div css={styles.grid}>
        <div css={styles.primaryColumn}>
          <main role="main" css={styles.mainContent}>
            <FormContextProvider initialScreen={initialScreen} fields={fields}>
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
                    case 'success':
                      return <SuccessMessage />;
                    case 'error':
                    default:
                      return <div>Error</div>;
                  }
                }}
              </FormContext.Consumer>
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
            </FormContextProvider>
          </main>
        </div>
      </div>
    </>
  );
};

export default UGCPageLayout;
