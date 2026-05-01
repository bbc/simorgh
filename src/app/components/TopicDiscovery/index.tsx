import { useState, useEffect, use } from 'react';
import CurationGrid from '#app/components/Curation/CurationGrid';
import useViewTracker from '#app/hooks/useViewTracker';
import { TopicTag } from '#app/models/types/metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import ScrollableTabs from './ScrollableTabs';
import styles from './index.styles';
import { multipleTopicsFixture } from './fixtures';

type TopicDiscoveryProps = {
  topics: Pick<TopicTag, 'topicId' | 'topicName' | 'topicUrl'>[];
};

const HEADING_ID = 'topic-discovery-heading';

const eventTrackingData = {
  componentName: 'topic-discovery',
};

const TopicDiscovery = ({ topics }: TopicDiscoveryProps) => {
  const { translations } = use(ServiceContext);
  const [topicPromos, setTopicPromos] = useState([]);
  const [activeTabId, setActiveTabId] = useState(topics?.[0]?.topicId || '');

  const viewTracker = useViewTracker(eventTrackingData);

  const activeTopic = topics?.find(topic => topic.topicId === activeTabId);

  const tabs = topics?.map(topic => ({
    id: topic.topicId,
    label: topic.topicName,
  }));

  useEffect(() => {
    // TODO: Replace with real data fetching logic when API is available
    setTopicPromos(multipleTopicsFixture?.[activeTabId]?.data?.items || []);
  }, [activeTabId]);

  const getMoreFromText = () => {
    const moreFrom = translations.topicDiscovery?.moreFrom;
    const topicTitleFirst = translations.topicDiscovery?.topicTitleFirst;
    if (!moreFrom) {
      return `More from ${activeTopic?.topicName}`;
    }
    if (topicTitleFirst) {
      return `${activeTopic?.topicName} ${moreFrom}`;
    }
    return `${moreFrom} ${activeTopic?.topicName}`;
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
        onTabChange={setActiveTabId}
        labelledBy={HEADING_ID}
      />
      <div
        role="tabpanel"
        id={`tabpanel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
        css={styles.tabPanel}
      >
        <CurationGrid
          summaries={topicPromos}
          eventTrackingData={eventTrackingData}
        />
        <a css={styles.moreFromLink} href={activeTopic?.topicUrl}>
          {getMoreFromText()}
        </a>
      </div>
    </section>
  );
};

export default TopicDiscovery;
