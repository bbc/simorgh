import { use } from 'react';
import CurationGrid from '#app/components/Curation/CurationGrid';
import useViewTracker from '#app/hooks/useViewTracker';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import { TopicTag } from '#app/models/types/metadata';
import styles from './index.styles';
import selectTopicVideos, {
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

  const topicIds = normaliseTopicIds((topics || []).map(t => t?.topicId));
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

  if (topicIds.length === 0) return null;

  // The wrapper stays mounted so the near-viewport observer can find it.
  const showGrid = !isLoading && !isError && videos.length >= MIN_VIDEOS;
  const showError = !isLoading && isError;

  return (
    <div
      id={TOPIC_VIDEO_CURATION_COMPONENT_ID}
      data-testid="topic-video-curation"
    >
      {(showGrid || showError) && (
        <section
          aria-labelledby={HEADING_ID}
          css={styles.section}
          className={className}
          dir={dir}
          {...(showGrid ? viewTracker : {})}
        >
          <h2 id={HEADING_ID} css={styles.heading}>
            {heading}
          </h2>
          {showError ? (
            <div role="alert" css={styles.errorMessage}>
              {fetchErrorMessage}
            </div>
          ) : (
            <CurationGrid
              summaries={videos}
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
