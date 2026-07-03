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
    moreFromTopic = 'More from {topic}',
    fetchErrorMessage = 'Failed to load. Please try again later.',
  } = translations.topicDiscovery || {};

  const [activeTabId, setActiveTabId] = useState(topics?.[0]?.topicId || '');
  const [shouldFocusPromos, setShouldFocusPromos] = useState(false);
  const activeTopic = topics?.find(topic => topic.topicId === activeTabId);
  const currentTopic = activeTopic || topics?.[0];
  const tabs = topics
    ? topics.map(topic => ({
        id: topic.topicId,
        label: topic.topicName,
      }))
    : [];

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    setShouldFocusPromos(true);
  };
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

  const moreFromLinkClickTracker = useClickTrackerHandler({
    componentName: 'topic-discovery-more-from-link',
    groupTracker,
    itemTracker: {
      type: 'topic-discovery-more-from-link',
      text: currentTopic
        ? moreFromTopic.replace('{topic}', currentTopic.topicName)
        : undefined,
      resourceId: currentTopic?.topicId,
    },
    ...(experimentProps && experimentProps),
  });

  const focusNextTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTabId);
    const nextTab = tabs[currentIndex + 1];

    if (!nextTab) return;

    setActiveTabId(nextTab.id);
    setShouldFocusPromos(false);

    requestAnimationFrame(() => {
      document.getElementById(`tab-${nextTab.id}`)?.focus();
    });
  };

  const handleMoreLinkKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
  ) => {
    if (event.key !== 'Tab' || event.shiftKey) {
      return;
    }

    event.preventDefault();
    focusNextTab();
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    tabId: string,
    isActive: boolean,
  ) => {
    if (
      event.key !== 'Tab' ||
      event.shiftKey ||
      !isActive ||
      !shouldFocusPromos
    ) {
      return;
    }

    const firstPromoLink = document.querySelector(
      `#tabpanel-${tabId} a, #tabpanel-${tabId} button`,
    ) as HTMLElement | null;

    if (!firstPromoLink) {
      return;
    }

    event.preventDefault();
    firstPromoLink.focus();
    setShouldFocusPromos(false);
  };

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
        onTabChange={handleTabChange}
        labelledBy={HEADING_ID}
        groupTracker={groupTracker}
        experimentProps={experimentProps}
        setShouldFocusPromos={setShouldFocusPromos}
        onTabKeyDown={handleTabKeyDown}
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
                    css={styles.moreFromLink}
                    href={selectedTopic.topicUrl}
                    data-testid="topic-discovery-more-from"
                    onKeyDown={handleMoreLinkKeyDown}
                    {...moreFromLinkClickTracker}
                  >
                    {moreFromTopic.replace('{topic}', selectedTopic.topicName)}
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
