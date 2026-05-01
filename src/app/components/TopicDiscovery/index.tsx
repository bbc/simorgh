import { useState } from 'react';
import CurationGrid from '#app/components/Curation/CurationGrid';
import useViewTracker from '#app/hooks/useViewTracker';
import ScrollableTabs from './ScrollableTabs';
import styles from './index.styles';
import { TopicDiscoveryData } from './types';

type TopicDiscoveryProps = {
  topicDiscovery: TopicDiscoveryData;
  headingText: string;
};

const HEADING_ID = 'topic-discovery-heading';

const eventTrackingData = {
  componentName: 'topic-discovery',
};

const TopicDiscovery = ({
  topicDiscovery,
  headingText,
}: TopicDiscoveryProps) => {
  const validTopics = topicDiscovery.topics.filter(
    topic => topic.items && topic.items.length > 0,
  );

  const [activeTabId, setActiveTabId] = useState(validTopics[0]?.topicId ?? '');

  const viewTracker = useViewTracker(eventTrackingData);

  if (validTopics.length === 0) return null;

  const activeTopic = validTopics.find(topic => topic.topicId === activeTabId);

  if (!activeTopic) return null;

  const tabs = validTopics.map(topic => ({
    id: topic.topicId,
    label: topic.topicName,
  }));

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
      />
      <div
        role="tabpanel"
        id={`tabpanel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
        css={styles.tabPanel}
      >
        <CurationGrid
          summaries={activeTopic.items}
          eventTrackingData={eventTrackingData}
        />
        <a
          css={styles.moreFromLink}
          href={activeTopic?.topicUrl}
        >{`More from ${activeTopic?.topicName}`}</a>
      </div>
    </section>
  );
};

export default TopicDiscovery;
