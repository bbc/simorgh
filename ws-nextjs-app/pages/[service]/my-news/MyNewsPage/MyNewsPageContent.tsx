import CurationGrid from '#app/components/Curation/CurationGrid';
import Heading from '#app/components/Heading';
import Pagination from '#app/components/Pagination';
import MetadataContainer from '#app/components/Metadata';
import TopicTags from '#app/components/TopicTags';
import Spinner from '#app/components/Spinner';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { RightChevron } from '#app/components/icons';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { use, useEffect, useRef, useState } from 'react';
import useUASRecentActivity from '#app/hooks/useUASRecentActivity';
import useUASFollowedTopics from '#app/hooks/useUASFollowedTopics';
import Text from '#app/components/Text';
import styles from './styles';

const ITEMS_PER_PAGE = 24;
const FOLLOWED_TOPICS_ITEMS_PER_PAGE = 100; // Load all topics at once for now
const FOLLOWED_TOPICS_VISIBLE_LIMIT = 9;

interface MyNewsPageContentProps {
  page?: string;
}

interface SectionSpinnerProps {
  label?: string;
  testId: string;
}

const SectionSpinner = ({ label, testId }: SectionSpinnerProps) => (
  <div css={styles.spinnerWrapper} data-testid={testId}>
    <VisuallyHiddenText aria-live="polite">{label}</VisuallyHiddenText>
    <Spinner css={styles.spinner} />
  </div>
);

const MyNewsPageContent = ({ page }: MyNewsPageContentProps) => {
  const { translations, lang } = use(ServiceContext);
  const [areAllTopicsVisible, setAreAllTopicsVisible] = useState(false);
  const wasTopicsExpandedRef = useRef(areAllTopicsVisible);

  useEffect(() => {
    const wasExpanded = wasTopicsExpandedRef.current;
    wasTopicsExpandedRef.current = areAllTopicsVisible;

    if (wasExpanded && !areAllTopicsVisible) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [areAllTopicsVisible]);

  const activePage = Math.max(1, Number(page) || 1);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;

  const {
    savedArticles,
    total,
    isLoading: articlesLoading,
    error: articlesError,
  } = useUASRecentActivity({
    itemsPerPage: ITEMS_PER_PAGE,
    startIndex,
  });

  const { isLoading: topicsLoading, error: topicsError } = useUASFollowedTopics(
    {
      itemsPerPage: FOLLOWED_TOPICS_ITEMS_PER_PAGE,
    },
  );

  // TEMP: hardcoded fictitious topics to test the ~150 followed topics behaviour, remove before merging
  const fictitiousFollowedTopics = Array.from({ length: 150 }, (_, index) => ({
    id: `fictitious-topic-${index}`,
    title: `Fictitious Topic ${index + 1}`,
  }));
  const followedTopics = fictitiousFollowedTopics;
  const topicsTotal = fictitiousFollowedTopics.length;

  const pageCount = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  const {
    pageXOfY,
    previousPage,
    nextPage,
    page: pageLabel,
  } = {
    pageXOfY: 'Page {x} of {y}',
    previousPage: 'Previous Page',
    nextPage: 'Next Page',
    page: 'Page',
    ...translations?.pagination,
  };

  if (!translations?.myNews) return null;
  const {
    title,
    description,
    errorText,
    noArticles,
    loading: loadingText,
    followedTopicsTitle,
    followedTopicsErrorText,
    noFollowedTopics,
    seeMoreTopics,
    seeLessTopics,
  } = translations.myNews;

  const translatedPage = pageXOfY
    .replace('{x}', String(activePage))
    .replace('{y}', String(pageCount));

  const metadataTitle = activePage >= 2 ? `${title}, ${translatedPage}` : title;

  const hasArticles = savedArticles.length > 0;
  const hasTopics = followedTopics.length > 0;
  const hasMoreTopicsThanLimit =
    followedTopics.length > FOLLOWED_TOPICS_VISIBLE_LIMIT;
  const visibleTopics = areAllTopicsVisible
    ? followedTopics
    : followedTopics.slice(0, FOLLOWED_TOPICS_VISIBLE_LIMIT);

  const transformTopicsForRelatedTopics = () =>
    visibleTopics.map(topic => ({
      topicId: topic.id,
      topicName: topic.title,
    }));

  const renderFollowedTopicsSection = () => (
    <section css={styles.section}>
      <Heading level={2} css={styles.subheading} size="doublePica">
        {topicsLoading || topicsError || !hasTopics
          ? followedTopicsTitle
          : `${followedTopicsTitle} (${topicsTotal})`}
      </Heading>
      {topicsLoading && (
        <SectionSpinner
          label={loadingText}
          testId="my-news-followed-topics-spinner"
        />
      )}
      {!topicsLoading && topicsError && (
        <Text size="doublePica" fontVariant="sansBold">
          {followedTopicsErrorText}
        </Text>
      )}
      {!topicsLoading && !topicsError && hasTopics && (
        <>
          <TopicTags tags={transformTopicsForRelatedTopics()} />
          {hasMoreTopicsThanLimit && (
            <button
              type="button"
              css={styles.seeMoreButton}
              aria-expanded={areAllTopicsVisible}
              onClick={() => setAreAllTopicsVisible(!areAllTopicsVisible)}
            >
              {areAllTopicsVisible ? seeLessTopics : seeMoreTopics}
              <RightChevron
                css={[
                  styles.seeMoreIcon,
                  areAllTopicsVisible && styles.seeMoreIconFlipped,
                ]}
              />
            </button>
          )}
        </>
      )}
      {!topicsLoading && !topicsError && !hasTopics && (
        <Text size="doublePica" fontVariant="sansBold">
          {noFollowedTopics}
        </Text>
      )}
    </section>
  );

  const renderSavedArticlesSection = () => (
    <section css={styles.section}>
      <Heading level={2} css={styles.subheading} size="doublePica">
        {description}
      </Heading>
      {articlesLoading && (
        <SectionSpinner
          label={loadingText}
          testId="my-news-saved-articles-spinner"
        />
      )}
      {!articlesLoading && articlesError && (
        <Text size="doublePica" fontVariant="sansBold">
          {errorText}
        </Text>
      )}
      {!articlesLoading && !articlesError && hasArticles && (
        <>
          <CurationGrid
            summaries={savedArticles}
            headingLevel={3}
            eventTrackingData={{
              componentName: 'my-news-curation-grid',
            }}
          />

          {pageCount > 1 && (
            <Pagination
              activePage={activePage}
              pageCount={pageCount}
              pageXOfY={pageXOfY}
              previousPage={previousPage}
              nextPage={nextPage}
              page={pageLabel}
            />
          )}
        </>
      )}
      {!articlesLoading && !articlesError && !hasArticles && (
        <Text size="doublePica" fontVariant="sansBold">
          {noArticles}
        </Text>
      )}
    </section>
  );

  return (
    <>
      <MetadataContainer
        title={metadataTitle}
        openGraphType="website"
        hasAmpPage={false}
        lang={lang}
      />
      <Heading level={1} id="content" tabIndex={-1} css={styles.heading}>
        {title}
      </Heading>
      {renderFollowedTopicsSection()}
      {renderSavedArticlesSection()}
    </>
  );
};

export default MyNewsPageContent;
