import CurationGrid from '#app/components/Curation/CurationGrid';
import Heading from '#app/components/Heading';
import Pagination from '#app/components/Pagination';
import MetadataContainer from '#app/components/Metadata';
import TopicTags from '#app/components/TopicTags';
import MyNewsSpinner from '#app/components/MyNewsSpinner';
import { RightChevron } from '#app/components/icons';
import { ServiceContext } from '#app/contexts/ServiceContext';
import {
  use,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import useUASRecentActivity from '#app/hooks/useUASRecentActivity';
import useUASFollowedTopics from '#app/hooks/useUASFollowedTopics';
import Text from '#app/components/Text';
import TopicRecommendations from './TopicRecommendations';
import styles from './styles';

const ITEMS_PER_PAGE = 24;
// Topics are fetched and paginated server-side in batches of 100.
const FOLLOWED_TOPICS_ITEMS_PER_PAGE = 100;
const FOLLOWED_TOPICS_VISIBLE_LIMIT = 9;

interface MyNewsPageContentProps {
  page?: string;
  showSavedArticles: boolean;
  showFollowedTopics: boolean;
  showPageHeading?: boolean;
}

const MyNewsRecommendationsOnly = ({
  showPageHeading = true,
}: Pick<MyNewsPageContentProps, 'showPageHeading'>) => {
  const { translations, lang } = use(ServiceContext);

  if (!translations?.myNews) return null;

  return (
    <>
      <MetadataContainer
        title={translations.myNews.title}
        openGraphType="website"
        hasAmpPage={false}
        lang={lang}
      />
      {showPageHeading && (
        <Heading level={1} id="content" tabIndex={-1} css={styles.heading}>
          {translations.myNews.title}
        </Heading>
      )}
      <TopicRecommendations />
    </>
  );
};

const MyNewsPagePersonalizedContent = ({
  page,
  showSavedArticles,
  showFollowedTopics,
}: MyNewsPageContentProps) => {
  const { translations, lang } = use(ServiceContext);
  const [areAllTopicsVisible, setAreAllTopicsVisible] = useState(false);
  const wasTopicsExpandedRef = useRef(areAllTopicsVisible);
  const shouldFocusFirstNewTopicRef = useRef(false);
  const followedTopicsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const wasExpanded = wasTopicsExpandedRef.current;
    wasTopicsExpandedRef.current = areAllTopicsVisible;

    if (wasExpanded && !areAllTopicsVisible) {
      const hasReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      window.scrollTo({
        top: 0,
        behavior: hasReducedMotion ? 'auto' : 'smooth',
      });
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

  const {
    followedTopics,
    isLoading: topicsLoading,
    error: topicsError,
  } = useUASFollowedTopics({
    itemsPerPage: FOLLOWED_TOPICS_ITEMS_PER_PAGE,
  });

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
    savedArticlesErrorText,
    noArticles,
    loading: loadingText,
    followedTopicsTitle,
    followedTopicsErrorText,
    noFollowedTopics,
    seeMoreTopics,
    seeLessTopics,
    contentErrorText,
  } = translations.myNews;

  const translatedPage = pageXOfY
    .replace('{x}', String(activePage))
    .replace('{y}', String(pageCount));

  const metadataTitle = activePage >= 2 ? `${title}, ${translatedPage}` : title;

  const hasArticles = savedArticles.length > 0;
  const hasTopics = followedTopics.length > 0;
  const bothSectionsFailed =
    showFollowedTopics &&
    showSavedArticles &&
    !articlesLoading &&
    !topicsLoading &&
    articlesError &&
    topicsError;
  const hasMoreTopicsThanLimit =
    followedTopics.length > FOLLOWED_TOPICS_VISIBLE_LIMIT;
  const visibleTopics = areAllTopicsVisible
    ? followedTopics
    : followedTopics.slice(0, FOLLOWED_TOPICS_VISIBLE_LIMIT);

  const handleSeeMoreClick = (event: MouseEvent<HTMLButtonElement>) => {
    shouldFocusFirstNewTopicRef.current = !areAllTopicsVisible;
    event.currentTarget.focus();
    setAreAllTopicsVisible(!areAllTopicsVisible);
  };

  const handleSeeMoreKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (
      event.key !== 'Tab' ||
      event.shiftKey ||
      !shouldFocusFirstNewTopicRef.current
    ) {
      return;
    }

    const firstNewTopic =
      followedTopicsSectionRef.current?.querySelectorAll<HTMLAnchorElement>(
        'ul[role="list"] a',
      )[FOLLOWED_TOPICS_VISIBLE_LIMIT];

    if (firstNewTopic) {
      event.preventDefault();
      firstNewTopic.focus();
    }
  };

  const handleSeeMoreBlur = () => {
    shouldFocusFirstNewTopicRef.current = false;
  };

  const transformTopicsForRelatedTopics = () =>
    visibleTopics.map(topic => ({
      topicId: topic.id,
      topicName: topic.title,
    }));

  const renderFollowedTopicsSection = () => (
    <section ref={followedTopicsSectionRef} css={styles.section}>
      <Heading level={2} css={styles.subheading} size="doublePica">
        {topicsLoading || topicsError || !hasTopics
          ? followedTopicsTitle
          : `${followedTopicsTitle} (${followedTopics.length})`}
      </Heading>
      {topicsLoading && (
        <MyNewsSpinner
          label={loadingText}
          testId="my-news-followed-topics-spinner"
        />
      )}
      {!topicsLoading && topicsError && <Text>{followedTopicsErrorText}</Text>}
      {!topicsLoading && !topicsError && hasTopics && (
        <>
          <TopicTags
            tags={transformTopicsForRelatedTopics()}
            trackingSource="my-news"
          />
          {hasMoreTopicsThanLimit && (
            <button
              type="button"
              css={styles.seeMoreButton}
              aria-expanded={areAllTopicsVisible}
              onClick={handleSeeMoreClick}
              onKeyDown={handleSeeMoreKeyDown}
              onBlur={handleSeeMoreBlur}
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
        <Text>{noFollowedTopics}</Text>
      )}
    </section>
  );

  const renderSavedArticlesSection = () => (
    <section css={styles.section}>
      <Heading level={2} css={styles.subheading} size="doublePica">
        {description}
      </Heading>
      {articlesLoading && (
        <MyNewsSpinner
          label={loadingText}
          testId="my-news-saved-articles-spinner"
        />
      )}
      {!articlesLoading && articlesError && (
        <Text>{savedArticlesErrorText}</Text>
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
        <Text>{noArticles}</Text>
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
      <TopicRecommendations
        followedTopicIds={followedTopics.map(topic => topic.id)}
      />
      {bothSectionsFailed ? (
        <Text>{contentErrorText}</Text>
      ) : (
        <>
          {showFollowedTopics && renderFollowedTopicsSection()}
          {showSavedArticles && renderSavedArticlesSection()}
        </>
      )}
    </>
  );
};

const MyNewsPageContent = (props: MyNewsPageContentProps) => {
  const { showSavedArticles, showFollowedTopics, showPageHeading } = props;

  if (!showSavedArticles && !showFollowedTopics) {
    return <MyNewsRecommendationsOnly showPageHeading={showPageHeading} />;
  }

  return <MyNewsPagePersonalizedContent {...props} />;
};

export default MyNewsPageContent;
