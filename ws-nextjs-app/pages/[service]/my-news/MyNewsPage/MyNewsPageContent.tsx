import CurationGrid from '#app/components/Curation/CurationGrid';
import Heading from '#app/components/Heading';
import Pagination from '#app/components/Pagination';
import MetadataContainer from '#app/components/Metadata';
import TopicTags from '#app/components/TopicTags';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { use } from 'react';
import useUASRecentActivity from '#app/hooks/useUASRecentActivity';
import useUASFollowedTopics from '#app/hooks/useUASFollowedTopics';
import Text from '#app/components/Text';
import styles from './styles';
import MyNewsPageLoading from './MyNewsPageLoading';

const ITEMS_PER_PAGE = 24;

interface MyNewsPageContentProps {
  page?: string;
}

const MyNewsPageContent = ({ page }: MyNewsPageContentProps) => {
  const { translations, lang } = use(ServiceContext);

  const activePage = Math.max(1, Number(page) || 1);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;

  const { savedArticles, total, isLoading, error } = useUASRecentActivity({
    itemsPerPage: ITEMS_PER_PAGE,
    startIndex,
  });

  const {
    followedTopics,
    total: topicsTotal,
    isLoading: topicsLoading,
    error: topicsError,
  } = useUASFollowedTopics({
    itemsPerPage: 100, // Load all topics at once for now
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
  const { title, errorText, noArticles, description } = translations.myNews;

  const translatedPage = pageXOfY
    .replace('{x}', String(activePage))
    .replace('{y}', String(pageCount));

  const metadataTitle = activePage >= 2 ? `${title}, ${translatedPage}` : title;

  if (isLoading || topicsLoading) {
    return <MyNewsPageLoading />;
  }

  const transformTopicsForRelatedTopics = () =>
    followedTopics.map(topic => ({
      topicId: topic.id,
      topicName: topic.title,
      link: topic.link,
    }));

  const renderContent = () => {
    const hasArticles = savedArticles.length > 0;
    const hasTopics = followedTopics.length > 0;
    const hasError = error || topicsError;

    if (hasError) {
      return (
        <Text size="doublePica" fontVariant="sansBold">
          {errorText}
        </Text>
      );
    }

    if (!hasArticles && !hasTopics) {
      return (
        <Text size="doublePica" fontVariant="sansBold">
          {noArticles}
        </Text>
      );
    }

    return (
      <>
        {hasTopics && (
          <section css={styles.section}>
            <Heading level={2} css={styles.subheading} size="doublePica">
              Followed Topics ({topicsTotal})
            </Heading>
            {/* <RelatedTopics
              topics={transformTopicsForRelatedTopics()}
              mobileDivider={false}
              bar={false}
            /> */}
            <TopicTags tags={transformTopicsForRelatedTopics()} />
          </section>
        )}

        {hasArticles && (
          <section css={styles.section}>
            <Heading level={2} css={styles.subheading} size="doublePica">
              {description}
            </Heading>
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
          </section>
        )}
      </>
    );
  };

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
      {renderContent()}
    </>
  );
};

export default MyNewsPageContent;
