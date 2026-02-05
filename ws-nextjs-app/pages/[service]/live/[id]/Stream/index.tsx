import { use, useEffect, useRef, useState } from 'react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import { ServiceContext } from '#contexts/ServiceContext';
import { StreamResponse } from '../Post/types';
import Post from '../Post';
import styles from './styles';
import LatestPostButton from '../LatestPostButton';

const Stream = ({
  streamContent,
  contributors,
  firstPostRef,
  isFirstPostVisible,
  hasPendingUpdate,
}: {
  streamContent: StreamResponse | null;
  contributors: string | null;
  firstPostRef: React.RefObject<HTMLLIElement>;
  isFirstPostVisible: boolean;
  hasPendingUpdate: boolean;
}) => {
  const {
    translations: {
      liveExperiencePage: { liveCoverage = 'Live Coverage' },
    },
  } = use(ServiceContext);

  const [hasShareApi, setHasShareApi] = useState(false);
  const [hashValue, setHashValue] = useState('');
  const streamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const URLHash = window.location.hash.substring(1);
    setHashValue(URLHash);

    if (hashValue) {
      window.location.href = `#${hashValue}`;
    }

    if ('share' in navigator) {
      setHasShareApi(true);
    }
  }, [hashValue]);

  if (!streamContent) return null;

  const { results: streamResults } = streamContent?.data;

  const hasNoPost = streamResults.length === 0;
  const hasSinglePost = streamResults.length === 1;

  if (hasNoPost) return null;

  return (
    <div id="stream-container" ref={streamRef}>
      <Heading
        css={[
          styles.heading,
          !contributors && styles.headingNoContributorsPadding,
        ]}
        level={2}
      >
        {liveCoverage}
      </Heading>
      {contributors && (
        <Paragraph data-testid="live-contributors" css={styles.subHeading}>
          {contributors}
        </Paragraph>
      )}
      {hasSinglePost ? (
        <Post post={streamResults[0]} hasShareApi={hasShareApi} />
      ) : (
        <>
          <ol role="list" css={styles.orderedList}>
            <li
              key={streamResults[0].urn}
              css={styles.listItem}
              ref={firstPostRef}
            >
              <Post post={streamResults[0]} hasShareApi={hasShareApi} />
            </li>
            {streamResults.slice(1).map(post => (
              <li key={post.urn} css={styles.listItem}>
                <Post post={post} hasShareApi={hasShareApi} />
              </li>
            ))}
          </ol>
          <LatestPostButton
            streamRef={streamRef as React.RefObject<HTMLDivElement>}
            isFirstPostVisible={isFirstPostVisible}
            hasPendingUpdate={hasPendingUpdate}
          />
        </>
      )}
    </div>
  );
};

export default Stream;
