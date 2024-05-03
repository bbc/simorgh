/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Metadata from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './styles';
import { PageProps } from './types';

const downloadsPageLayout = ({ pageData }: PageProps) => {
  const { lang } = useContext(ServiceContext);
  const { title, description } = pageData;

  return (
    <>
      <Metadata
        title="Test UGC Form"
        lang={lang}
        description="Test UGC Form"
        openGraphType="website"
        hasAmpPage={false}
      />
      <div css={styles.grid}>
        <div css={styles.primaryColumn}>
          <main css={styles.mainContent}>
            <Heading level={1}>{title}</Heading>
            <div
              // TODO: This is a security risk, we should sanitize the HTML
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default downloadsPageLayout;
