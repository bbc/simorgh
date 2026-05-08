import { useState, use } from 'react';
import CurationGrid from '#app/components/Curation/CurationGrid';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { TopicTag } from '#app/models/types/metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import ScrollableTabs from './ScrollableTabs';
import styles from './index.styles';
import useFetchTopicPromos from './useFetchTopicPromos';

type TopicDiscoveryProps = {
  topics: Pick<TopicTag, 'topicId' | 'topicName' | 'topicUrl'>[];
  className?: string;
};

const HEADING_ID = 'topic-discovery-heading';

const eventTrackingData = {
  componentName: 'topic-discovery',
};

const TopicDiscovery = ({ topics, className }: TopicDiscoveryProps) => {
  const { translations } = use(ServiceContext);
  const { topicDiscovery } = translations;
  const [activeTabId, setActiveTabId] = useState(topics?.[0]?.topicId || '');

  const { topicPromos, isLoading } = useFetchTopicPromos({ activeTabId });

  const viewTracker = useViewTracker(eventTrackingData);

  const moreFromLinkClickTracker = useClickTrackerHandler({
    componentName: 'topic-discovery-more-from-link',
  });

  const activeTopic = topics?.find(topic => topic.topicId === activeTabId);

  const tabs = topics?.map(topic => ({
    id: topic.topicId,
    label: topic.topicName,
  }));

  const getMoreFromText = () => {
    if (topicDiscovery?.moreFromTopic && activeTopic?.topicName) {
      return topicDiscovery.moreFromTopic.replace(
        '{topic}',
        activeTopic.topicName,
      );
    }
    return `More from ${activeTopic?.topicName}`;
  };

  if (!topics || topics.length === 0) return null;

  return (
    <section
      id="topic-discovery-component"
      aria-labelledby={HEADING_ID}
      css={styles.section}
      className={className}
      data-testid="topic-discovery"
      {...viewTracker}
    >
      <h2 id={HEADING_ID} css={styles.heading}>
        {topicDiscovery?.heading ?? 'Discover more'}
      </h2>
      <ScrollableTabs
        tabs={tabs}
        activeTabId={activeTabId}
        onTabChange={setActiveTabId}
        labelledBy={HEADING_ID}
      />
      <div
        role="tabpanel"
        id={`tabpanel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
        css={styles.tabPanel}
      >
        {isLoading ? (
          <>
            <div css={styles.skeletonGrid} aria-live="polite">
              {Array.from({ length: 4 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} css={styles.skeletonCard} aria-hidden>
                  <div css={styles.skeletonImage} />
                  <div css={styles.skeletonTextLines}>
                    <div css={[styles.skeletonLine, { width: '100%' }]} />
                    <div css={[styles.skeletonLine, { width: '70%' }]} />
                    <div css={[styles.skeletonLine, { width: '40%' }]} />
                  </div>
                </div>
              ))}
            </div>
            <div css={styles.skeletonMoreFromLinkContainer}>
              <div css={styles.skeletonMoreFromLink} aria-hidden />
            </div>
          </>
        ) : (
          <>
            <CurationGrid
              summaries={topicPromos}
              eventTrackingData={eventTrackingData}
            />
            <a
              css={styles.moreFromLink}
              href={activeTopic?.topicUrl}
              data-testid="topic-discovery-more-from"
              {...moreFromLinkClickTracker}
            >
              {getMoreFromText()}
            </a>
          </>
        )}
      </div>
    </section>
  );
};

export default TopicDiscovery;
