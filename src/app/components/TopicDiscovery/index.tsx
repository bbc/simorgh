import { use, useState } from 'react';

import CurationGrid from '#app/components/Curation/CurationGrid';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import type { TopicTag } from '#app/models/types/metadata';
import styles from './index.styles';
import ScrollableTabs from './ScrollableTabs';
import useFetchTopicPromos from './useFetchTopicPromos';

type ExtractedTopic = Pick<TopicTag, 'topicId' | 'topicName' | 'topicUrl'>;

type TopicDiscoveryProps = {
  topics: ExtractedTopic[];
  className?: string;
};

const HEADING_ID = 'topic-discovery-heading';

const eventTrackingData = {
  componentName: 'topic-discovery',
};

const TopicDiscovery = ({ topics, className }: TopicDiscoveryProps) => {
  const { translations } = use(ServiceContext);
  const {
    heading = 'Discover more',
    moreFromTopic = 'More from {topic}',
    fetchErrorMessage = 'Failed to load. Please try again later.',
  } = translations.topicDiscovery || {};

  const [activeTabId, setActiveTabId] = useState(topics?.[0]?.topicId || '');

  const { topicPromos, isLoading, isError } = useFetchTopicPromos({
    activeTabId,
  });

  const viewTracker = useViewTracker(eventTrackingData);

  const errorMessageViewTracker = useViewTracker({
    componentName: 'topic-discovery-fetch-error-message',
  });

  const moreFromLinkClickTracker = useClickTrackerHandler({
    componentName: 'topic-discovery-more-from-link',
  });

  if (!topics || topics.length === 0) return null;

  const activeTopic = topics.find(
    topic => topic.topicId === activeTabId,
  ) as ExtractedTopic;

  const tabs = topics.map(topic => ({
    id: topic.topicId,
    label: topic.topicName,
  }));

  const showLoadingState = Boolean(isLoading && !isError);
  const showErrorMessage = Boolean(!isLoading && isError);

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
        {heading}
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
        {(() => {
          switch (true) {
            case showLoadingState:
              return (
                <>
                  <div css={styles.skeletonGrid} aria-live="polite">
                    {Array.from({ length: 4 }).map((_, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: we want this
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
              );
            case showErrorMessage:
              return (
                <p css={styles.errorMessage} {...errorMessageViewTracker}>
                  {fetchErrorMessage}
                </p>
              );
            default:
              return (
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
                    {moreFromTopic.replace('{topic}', activeTopic.topicName)}
                  </a>
                </>
              );
          }
        })()}
      </div>
    </section>
  );
};

export default TopicDiscovery;
