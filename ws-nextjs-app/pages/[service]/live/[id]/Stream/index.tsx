import {
  Dispatch,
  ForwardedRef,
  forwardRef,
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
  streamContent: StreamResponse | null;
  contributors: string | null;
  setIsFirstPostVisible: Dispatch<SetStateAction<boolean>>;
};

const Stream = forwardRef(
  (
    { streamContent, contributors, setIsFirstPostVisible }: Props,
    streamRef: ForwardedRef<HTMLDivElement>,
  ) => {
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
          setIsFirstPostVisible(entry.isIntersecting);
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
    }, [setIsFirstPostVisible, streamContent]);

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
        )}
      </div>
    );
  },
);

export default Stream;
