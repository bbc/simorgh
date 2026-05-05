import { useState, useEffect, use, useRef } from 'react';
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

export const FAKE_FETCH_DELAY_MS = 600;

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
  const promosCacheRef = useRef<Record<string, TopicDiscoveryItem[]>>({});
  const [topicPromos, setTopicPromos] = useState<TopicDiscoveryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTabId, setActiveTabId] = useState(topics?.[0]?.topicId || '');

  useEffect(() => {
    let isActive = true;

    const cachedPromos = promosCacheRef.current[activeTabId];

    if (cachedPromos) {
      setTopicPromos(cachedPromos);
      setIsLoading(false);
    } else {
      setIsLoading(true);

      fetchTopicPromos(activeTabId).then(fetchedTopicPromos => {
        if (!isActive) return;

        promosCacheRef.current[activeTabId] = fetchedTopicPromos;
        setTopicPromos(fetchedTopicPromos);
        setIsLoading(false);
      });
    }

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

  const handleTabChange = (nextTabId: TopicTag['topicId']) => {
    if (nextTabId === activeTabId) return;

    const hasCachedPromos = Boolean(promosCacheRef.current[nextTabId]);

    setIsLoading(!hasCachedPromos);
    setActiveTabId(nextTabId);
  };

  const getMoreFromText = () => {
    const moreFromTopic = translations.topicDiscovery?.moreFromTopic;
    if (moreFromTopic && activeTopic?.topicName) {
      return moreFromTopic.replace('{topic}', activeTopic.topicName);
    }
    // fallback to English if not present
    return `More from ${activeTopic?.topicName}`;
  };

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
        onTabChange={handleTabChange}
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
