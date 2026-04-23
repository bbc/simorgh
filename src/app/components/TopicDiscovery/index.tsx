import { useState } from 'react';
import CurationGrid from '#app/components/Curation/CurationGrid';
import { Summary } from '#app/models/types/curationData';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import ScrollableTabs from './ScrollableTabs';
import styles from './index.styles';
import { TopicDiscoveryData, TopicDiscoveryItem } from './types';

type TopicDiscoveryProps = {
  topicDiscovery: TopicDiscoveryData;
  headingText: string;
};

const HEADING_ID = 'topic-discovery-heading';

const DEFAULT_IMAGE_WIDTH = 660;

const eventTrackingData = {
  componentName: 'topic-discovery',
};

const mapItemToSummary = (item: TopicDiscoveryItem): Summary => ({
  id: item.id,
  title: item.title,
  link: item.link,
  imageUrl: item.imageUrl.replace('{width}', String(DEFAULT_IMAGE_WIDTH)),
  imageAlt: item.imageAlt,
  type: item.type,
  mediaType: item.type === 'article' ? undefined : item.type,
  description: item.description,
  firstPublished: item.firstPublished,
  lastPublished: item.lastPublished,
  isLive: item.isLive,
  duration: item.duration,
  isPortraitImage: item.isPortraitImage,
});

const TopicDiscovery = ({
  topicDiscovery,
  headingText,
}: TopicDiscoveryProps) => {
  const validTopics = topicDiscovery.topics.filter(
    topic => topic.items && topic.items.length > 0,
  );

  const [activeTabId, setActiveTabId] = useState(validTopics[0]?.topicId ?? '');

  const viewTracker = useViewTracker(eventTrackingData);
  const clickTrackerHandler = useClickTrackerHandler({
    ...eventTrackingData,
    preventNavigation: true,
  });

  if (validTopics.length === 0) return null;

  const activeTopic = validTopics.find(topic => topic.topicId === activeTabId);

  if (!activeTopic) return null;

  const tabs = validTopics.map(topic => ({
    id: topic.topicId,
    label: topic.topicName,
  }));

  const summaries = activeTopic.items.map(mapItemToSummary);

  return (
    <section
      aria-labelledby={HEADING_ID}
      css={styles.section}
      data-testid="topic-discovery"
      {...viewTracker}
    >
      <h2 id={HEADING_ID} css={styles.heading}>
        {headingText}
      </h2>
      <ScrollableTabs
        tabs={tabs}
        activeTabId={activeTabId}
        onTabChange={setActiveTabId}
        labelledBy={HEADING_ID}
        clickTrackerHandler={clickTrackerHandler}
      />
      <div
        role="tabpanel"
        id={`tabpanel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
        css={styles.tabPanel}
      >
        <CurationGrid
          summaries={summaries}
          eventTrackingData={eventTrackingData}
        />
      </div>
    </section>
  );
};

export default TopicDiscovery;
