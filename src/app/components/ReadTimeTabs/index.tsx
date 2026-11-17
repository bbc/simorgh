import { use, useState } from 'react';
import CurationGrid from '#app/components/Curation/CurationGrid';
import ScrollableTabs from '#app/components/TopicDiscovery/ScrollableTabs';
import useViewTracker from '#app/hooks/useViewTracker';
import { ServiceContext } from '#app/contexts/ServiceContext';
import classifyByReadTime, { ReadTimeItem } from './classifyByReadTime';
import styles from './index.styles';

const HEADING_ID = 'read-time-tabs-heading';
const COMPONENT_NAME = 'read-time-tabs';
const SHORT_READS_ID = 'short-reads';
const LONG_READS_ID = 'long-reads';
const SKELETON_CARD_COUNT = 4;

type ReadTimeTabsProps = {
  /**
   * Client-fetched items. Each must carry `readTime` in whole minutes.
   * Typed as `unknown` because it is untrusted JSON; malformed or
   * unclassifiable entries are dropped rather than guessed at.
   */
  items?: unknown;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
};

const ReadTimeTabs = ({
  items,
  isLoading = false,
  isError = false,
  className,
}: ReadTimeTabsProps) => {
  const { translations, dir } = use(ServiceContext);
  const {
    heading = 'Read more',
    shortReads: shortReadsLabel = 'Short reads',
    longReads: longReadsLabel = 'Long reads',
    fetchErrorMessage = 'Failed to load. Please try again later.',
  } = translations.readTimeRecommendations || {};

  const { shortReads, longReads } = classifyByReadTime(items);

  const tabs = [
    { id: SHORT_READS_ID, label: shortReadsLabel, items: shortReads },
    { id: LONG_READS_ID, label: longReadsLabel, items: longReads },
  ].filter(tab => tab.items.length > 0);

  const [selectedTabId, setSelectedTabId] = useState(SHORT_READS_ID);

  // Fall back to the first populated tab so a stale selection never renders an
  // empty panel (e.g. when the data changes).
  const activeTab =
    tabs.find(tab => tab.id === selectedTabId) ?? (tabs[0] || null);

  const groupTracker = {
    name: heading,
    type: COMPONENT_NAME,
    ...(tabs.length > 0 && {
      itemCount: shortReads.length + longReads.length,
    }),
  };

  const viewTracker = useViewTracker({
    componentName: COMPONENT_NAME,
    groupTracker,
  });
  const errorViewTracker = useViewTracker({
    componentName: `${COMPONENT_NAME}-fetch-error-message`,
  });

  const showLoading = isLoading && !isError;
  const showError = !isLoading && isError;

  if (!showLoading && !showError && !activeTab) return null;

  const renderGrid = (tab: NonNullable<typeof activeTab>) => (
    <CurationGrid
      summaries={tab.items as ReadTimeItem[]}
      showReadTime
      eventTrackingData={{
        componentName: COMPONENT_NAME,
        groupTracker: {
          name: tab.label,
          type: `${COMPONENT_NAME}-curation-grid`,
          resourceId: tab.id,
          itemCount: tab.items.length,
        },
      }}
    />
  );

  const renderBody = () => {
    if (showLoading) {
      return (
        <div css={styles.skeletonGrid} aria-live="polite" data-testid="loading">
          {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} css={styles.skeletonCard} aria-hidden>
              <div css={styles.skeletonImage} />
              <div css={[styles.skeletonLine, { width: '100%' }]} />
              <div css={[styles.skeletonLine, { width: '60%' }]} />
            </div>
          ))}
        </div>
      );
    }

    if (showError) {
      return (
        <p role="alert" css={styles.errorMessage} {...errorViewTracker}>
          {fetchErrorMessage}
        </p>
      );
    }

    if (!activeTab) return null;

    // One populated group: a tab control with nothing to switch to would be
    // misleading, so show the list directly.
    if (tabs.length === 1) {
      return <div css={styles.panel}>{renderGrid(activeTab)}</div>;
    }

    return (
      <>
        <ScrollableTabs
          tabs={tabs.map(({ id, label }) => ({ id, label }))}
          activeTabId={activeTab.id}
          onTabChange={setSelectedTabId}
          labelledBy={HEADING_ID}
          groupTracker={groupTracker}
          trackerName={`${COMPONENT_NAME}-tab`}
        />
        <div
          key={activeTab.id}
          role="tabpanel"
          id={`tabpanel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          css={styles.panel}
        >
          {renderGrid(activeTab)}
        </div>
      </>
    );
  };

  return (
    <section
      id="read-time-tabs-component"
      aria-labelledby={HEADING_ID}
      css={styles.section}
      className={className}
      data-testid={COMPONENT_NAME}
      dir={dir}
      {...viewTracker}
    >
      <h2 id={HEADING_ID} css={styles.heading}>
        {heading}
      </h2>
      {renderBody()}
    </section>
  );
};

export default ReadTimeTabs;
