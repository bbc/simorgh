import CurationGrid from '#app/components/Curation/CurationGrid';
import Heading from '#app/components/Heading';
import Pagination from '#app/components/Pagination';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import MetadataContainer from '#app/components/Metadata';
import useUASRecentActivity from '#app/hooks/useUASRecentActivity';
import styles from './styles';

const ITEMS_PER_PAGE = 10;

const MyNewsPage = () => {
  const router = useRouter();
  const { translations, lang } = useContext(ServiceContext);

  const pageFromQuery = Array.isArray(router.query.page)
    ? router.query.page[0]
    : router.query.page;
  const requestedPage = Math.max(1, Number(pageFromQuery ?? 1));

  const startIndex = (requestedPage - 1) * ITEMS_PER_PAGE;
  const { savedArticles, total, isLoading, error } = useUASRecentActivity({
    itemsPerPage: ITEMS_PER_PAGE,
    startIndex,
  });

  const pageCount = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const safeActivePage = Math.min(requestedPage, pageCount);

  const {
    pageXOfY = 'Page {x} of {y}',
    previousPage = 'Previous page',
    nextPage = 'Next page',
    page: pageLabel = 'Page',
  } = translations?.pagination || {};

  const translatedPage = pageXOfY
    .replace('{x}', String(safeActivePage))
    .replace('{y}', String(pageCount));

  const metadataTitle =
    safeActivePage >= 2 ? `My News, ${translatedPage}` : 'My News';

  const renderContent = () => {
    if (isLoading) {
      return (
        <div css={styles.empty}>
          <Heading level={2}>My News</Heading>
          <p>Loading your articles...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div css={styles.empty}>
          <Heading level={2}>My News</Heading>
          <p>Error loading articles: {error}</p>
        </div>
      );
    }

    if (savedArticles.length > 0) {
      return (
        <>
          <Heading level={2}>My News</Heading>
          <CurationGrid
            summaries={savedArticles}
            headingLevel={2}
            eventTrackingData={{
              componentName: 'my-news-curation-grid',
            }}
          />

          {pageCount > 1 && (
            <Pagination
              activePage={safeActivePage}
              pageCount={pageCount}
              pageXOfY={pageXOfY}
              previousPage={previousPage}
              nextPage={nextPage}
              page={pageLabel}
            />
          )}
        </>
      );
    }

    return (
      <div css={styles.empty}>
        <Heading level={2}>My News</Heading>
        <p>No saved articles yet</p>
      </div>
    );
  };

  return (
    <main css={styles.main}>
      <MetadataContainer
        title={metadataTitle}
        openGraphType="website"
        hasAmpPage={false}
        lang={lang}
      />
      <div css={styles.inner}>{renderContent()}</div>
    </main>
  );
};

export default MyNewsPage;
