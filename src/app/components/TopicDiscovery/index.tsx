import { useState, use } from 'react';
import CurationGrid from '#app/components/Curation/CurationGrid';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { TopicTag } from '#app/models/types/metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { ComponentExperimentProps } from '#app/models/types/global';
import ScrollableTabs from './ScrollableTabs';
import styles from './index.styles';
import useFetchTopicPromos from './useFetchTopicPromos';

type ExtractedTopic = Pick<TopicTag, 'topicId' | 'topicName' | 'topicUrl'>;

type TopicDiscoveryProps = {
  topics: ExtractedTopic[];
  className?: string;
  experimentProps?: ComponentExperimentProps;
};

const HEADING_ID = 'topic-discovery-heading';

const TopicDiscovery = ({
  topics,
  className,
  experimentProps,
}: TopicDiscoveryProps) => {
  const { translations } = use(ServiceContext);
  const {
    heading = 'Discover more',
    moreAboutTopic = 'More about {topic}',
    fetchErrorMessage = 'Failed to load. Please try again later.',
  } = translations.topicDiscovery || {};

  const [activeTabId, setActiveTabId] = useState(topics?.[0]?.topicId || '');
  const activeTopic = topics?.find(topic => topic.topicId === activeTabId);
  const currentTopic = activeTopic || topics?.[0];
  const tabs = topics
    ? topics.map(topic => ({
        id: topic.topicId,
        label: topic.topicName,
      }))
    : [];
  const groupTracker = {
    name: heading,
    type: 'topic-discovery',
    ...(topics?.length > 0 && { itemCount: topics.length }),
  };
  const eventTrackingData = {
    componentName: 'topic-discovery',
    groupTracker,
    ...(experimentProps && experimentProps),
  };

  const { topicPromos, isLoading, isError } = useFetchTopicPromos({
    activeTabId,
  });

  const viewTracker = useViewTracker(eventTrackingData);

  const errorMessageViewTracker = useViewTracker({
    componentName: 'topic-discovery-fetch-error-message',
  });

  const moreAboutLinkClickTracker = useClickTrackerHandler({
    componentName: 'topic-discovery-more-about-link',
    groupTracker,
    itemTracker: {
      type: 'topic-discovery-more-about-link',
      text: currentTopic
        ? moreAboutTopic.replace('{topic}', currentTopic.topicName)
        : undefined,
      resourceId: currentTopic?.topicId,
    },
    ...(experimentProps && experimentProps),
  });

  if (!topics || topics.length === 0) return null;
  const selectedTopic = currentTopic as ExtractedTopic;

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
        groupTracker={groupTracker}
        experimentProps={experimentProps}
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
                  <div css={styles.skeletonMoreAboutLinkContainer}>
                    <div css={styles.skeletonMoreAboutLink} aria-hidden />
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
                    eventTrackingData={{
                      componentName: 'topic-discovery-curation-grid',
                      groupTracker: {
                        name: selectedTopic.topicName,
                        type: 'topic-discovery-curation-grid',
                        link: selectedTopic.topicUrl,
                        resourceId: selectedTopic.topicId,
                        ...(topicPromos?.length > 0 && {
                          itemCount: topicPromos.length,
                        }),
                      },
                      ...(experimentProps && experimentProps),
                    }}
                  />
                  <a
                    css={styles.moreAboutLink}
                    href={selectedTopic.topicUrl}
                    data-testid="topic-discovery-more-about"
                    {...moreAboutLinkClickTracker}
                  >
                    {moreAboutTopic.replace('{topic}', selectedTopic.topicName)}
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
