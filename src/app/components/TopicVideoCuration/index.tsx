import { use } from 'react';
import CurationGrid from '#app/components/Curation/CurationGrid';
import useViewTracker from '#app/hooks/useViewTracker';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useHasVideoEngagement from '#app/hooks/useHasVideoEngagement';
import { TopicTag } from '#app/models/types/metadata';
import styles from './index.styles';
import selectTopicVideos, {
  MAX_VIDEOS,
  MIN_VIDEOS,
  normaliseTopicIds,
} from './selectTopicVideos';
import useFetchTopicVideos, {
  TOPIC_VIDEO_CURATION_COMPONENT_ID,
} from './useFetchTopicVideos';

type Props = {
  topics: Pick<TopicTag, 'topicId'>[];
  className?: string;
};

const HEADING_ID = 'topic-video-curation-heading';

const TopicVideoCuration = ({ topics, className }: Props) => {
  const { translations, dir } = use(ServiceContext);
  const { pathname } = use(RequestContext);
  const heading = translations?.media?.watch;
  const { fetchErrorMessage = 'Failed to load. Please try again later.' } =
    translations?.topicDiscovery || {};

  const hasVideoEngagement = useHasVideoEngagement();

  const pageTopicIds = normaliseTopicIds((topics || []).map(t => t?.topicId));
  // Without prior video engagement no topic requests are made at all.
  const topicIds = hasVideoEngagement ? pageTopicIds : [];
  const { resultsByTopic, isLoading, isError } = useFetchTopicVideos({
    topicIds,
  });

  const videos = selectTopicVideos(resultsByTopic, pathname || '');

  const groupTracker = {
    name: heading,
    type: 'topic-video-curation',
    ...(videos.length > 0 && { itemCount: videos.length }),
  };
  const viewTracker = useViewTracker({
    componentName: 'topic-video-curation',
    groupTracker,
  });

  if (pageTopicIds.length === 0) return null;

  // The wrapper is mounted before engagement is read (it is read after mount)
  // because the near-viewport observer only looks for it once, on mount.
  const showGrid =
    hasVideoEngagement && !isLoading && !isError && videos.length >= MIN_VIDEOS;
  const showError = hasVideoEngagement && !isLoading && isError;
  const showSkeleton = hasVideoEngagement && isLoading;

  return (
    <div
      id={TOPIC_VIDEO_CURATION_COMPONENT_ID}
      data-testid="topic-video-curation"
    >
      {(showGrid || showError || showSkeleton) && (
        <section
          aria-labelledby={HEADING_ID}
          css={styles.section}
          className={className}
          dir={dir}
          {...(showGrid ? viewTracker : {})}
          aria-busy={showSkeleton || undefined}
        >
          <h2 id={HEADING_ID} css={styles.heading}>
            {heading}
          </h2>
          {showSkeleton && (
            <div
              css={styles.skeletonGrid}
              data-testid="topic-video-skeleton"
              aria-hidden
            >
              {Array.from({ length: MAX_VIDEOS }, (_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} css={styles.skeletonCard}>
                  <div css={styles.skeletonImage} />
                  <div css={styles.skeletonLine} />
                </div>
              ))}
            </div>
          )}
          {showError ? (
            <div role="alert" css={styles.errorMessage}>
              {fetchErrorMessage}
            </div>
          ) : null}
          {showGrid && (
            <CurationGrid
              summaries={videos}
              isFirstCuration={false}
              eventTrackingData={{
                componentName: 'topic-video-curation-grid',
                groupTracker: {
                  ...groupTracker,
                  type: 'topic-video-curation-grid',
                },
              }}
            />
          )}
        </section>
      )}
    </div>
  );
};

export default TopicVideoCuration;
