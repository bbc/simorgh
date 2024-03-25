/** @jsx jsx */
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import styles from './styles';
import { PageProps } from './types';
import { FormContextProvider } from './FormContext';
import Form from './Form';

const UGCPageLayout = ({ pageData }: PageProps) => {
  const {
    data: { title, description, sections },
  } = pageData;

  const { fields } = sections?.[0] ?? {};

  return (
    <div css={styles.grid}>
      <div css={styles.primaryColumn}>
        <main css={styles.mainContent} role="main">
          <Heading level={1}>{title}</Heading>
          <div>{description}</div>
          <FormContextProvider fields={fields}>
            <Form fields={fields} />
          </FormContextProvider>
        </main>
      </div>
    </div>
  );
};

export default UGCPageLayout;
