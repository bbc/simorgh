/** @jsx jsx */
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import styles from './styles';

export default function Uploading() {
  return (
    <>
      <Heading level={1} id="content" tabIndex={-1} css={styles.heading}>
        Uploading
      </Heading>
      <Paragraph>Please wait until it is finished.</Paragraph>
    </>
  );
}
