/** @jsx jsx */
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import { StreamResponse } from '../Post/types';
import Post from '../Post';
import styles from './styles';

const Stream = ({
  streamContent,
}: {
  streamContent: StreamResponse | null;
}) => {
  if (!streamContent) return null;
  const { results: streamResults } = streamContent?.data;

  if (streamResults.length === 0) return null;

  return (
    <div>
      <Heading css={styles.heading} level={2}>
        Live Reporting
      </Heading>
      <Paragraph css={styles.subHeading}>By a random dude</Paragraph>
      <ol css={styles.unorderedList}>
        {streamResults.map(post => (
          <li key={post.urn} css={styles.list}>
            <Post post={post} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Stream;
