import {
  Dispatch,
  ForwardedRef,
  SetStateAction,
  use,
  useEffect,
  useRef,
  useState,
} from 'react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import { ServiceContext } from '#contexts/ServiceContext';
import { StreamResponse } from '../Post/types';
import Post from '../Post';
import styles from './styles';

type Props = {
  streamData: StreamResponse['data'] | null;
  contributors: string | null;
  setIsFirstPostVisible: Dispatch<SetStateAction<boolean>>;
  streamRef: ForwardedRef<HTMLDivElement>;
  applyPendingUpdate: () => void;
};

const Stream = ({
  streamData,
  contributors,
  setIsFirstPostVisible,
  streamRef,
  applyPendingUpdate,
}: Props) => {
  const {
    translations: {
      liveExperiencePage: { liveCoverage = 'Live Coverage' },
    },
  } = use(ServiceContext);

  const firstPostRef = useRef<HTMLLIElement>(null);
  const [hasShareApi, setHasShareApi] = useState(false);
  const [hashValue, setHashValue] = useState('');

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

  useEffect(() => {
    if (!firstPostRef.current) return undefined;

    const firstPostObserver = new IntersectionObserver(
      ([entry]) => {
        const { boundingClientRect } = entry;

        const isPostInView = boundingClientRect.bottom > 0;

        setIsFirstPostVisible(isPostInView);
        if (isPostInView) {
          applyPendingUpdate();
        }
      },
      {
        threshold: 0,
        rootMargin: '0px',
      },
    );

    firstPostObserver.observe(firstPostRef.current);

    return () => {
      firstPostObserver.disconnect();
    };
  }, [setIsFirstPostVisible, applyPendingUpdate]);

  if (!streamData) return null;

  const { results: streamResults } = streamData;

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
        <ol role="list" css={styles.orderedList}>
          {streamResults.map((post, index) => (
            <li
              key={post.urn}
              css={styles.listItem}
              {...(index === 0 && { ref: firstPostRef })}
            >
              <Post post={post} hasShareApi={hasShareApi} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Stream;
