import { useState, useEffect, use } from 'react';
import CurationGrid from '#app/components/Curation/CurationGrid';
import useViewTracker from '#app/hooks/useViewTracker';
import { TopicTag } from '#app/models/types/metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import ScrollableTabs from './ScrollableTabs';
import styles from './index.styles';
import { multipleTopicsFixture } from './fixtures';
import { TopicDiscoveryItem } from './types';

type TopicDiscoveryProps = {
  topics: Pick<TopicTag, 'topicId' | 'topicName' | 'topicUrl'>[];
};

const HEADING_ID = 'topic-discovery-heading';

const eventTrackingData = {
  componentName: 'topic-discovery',
};

const FAKE_FETCH_DELAY_MS = 600;

const fetchTopicPromos = (
  topicId: TopicTag['topicId'],
): Promise<TopicDiscoveryItem[]> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(multipleTopicsFixture?.[topicId]?.data?.items || []);
    }, FAKE_FETCH_DELAY_MS);
  });

const TopicDiscovery = ({ topics }: TopicDiscoveryProps) => {
  const { translations } = use(ServiceContext);
  const [topicPromos, setTopicPromos] = useState<TopicDiscoveryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTabId, setActiveTabId] = useState(topics?.[0]?.topicId || '');

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);

    fetchTopicPromos(activeTabId).then(fetchedTopicPromos => {
      if (!isActive) return;

      setTopicPromos(fetchedTopicPromos);
      setIsLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, [activeTabId]);

  const viewTracker = useViewTracker(eventTrackingData);

  const activeTopic = topics?.find(topic => topic.topicId === activeTabId);

  const tabs = topics?.map(topic => ({
    id: topic.topicId,
    label: topic.topicName,
  }));

  if (!topics || topics.length === 0) return null;

  return (
    <section
      aria-labelledby={HEADING_ID}
      css={styles.section}
      data-testid="topic-discovery"
      {...viewTracker}
    >
      <h2 id={HEADING_ID} css={styles.heading}>
        {translations.topicDiscovery?.heading ?? 'Discover more'}
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
        ) : (
          <>
            <CurationGrid
              summaries={topicPromos}
              eventTrackingData={eventTrackingData}
            />
            <a
              css={styles.moreFromLink}
              href={activeTopic?.topicUrl}
            >{`More from ${activeTopic?.topicName}`}</a>
          </>
        )}
      </div>
    </section>
  );
};

export default TopicDiscovery;
