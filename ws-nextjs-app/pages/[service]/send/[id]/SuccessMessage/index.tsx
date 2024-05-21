/** @jsx jsx */
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import styles from './index.styles';

const SucccessMessage = () => {
  return (
    <>
      <Heading level={1} id="content" tabIndex={-1} css={styles.mainBody}>
        Success
      </Heading>
      <Paragraph>Great job!</Paragraph>
    </>
  );
};

export default SucccessMessage;
