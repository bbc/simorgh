import CurationGrid from '#app/components/Curation/CurationGrid';
import Pagination from '#app/components/Pagination';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MetadataContainer from '#app/components/Metadata';
import type { SavedArticle } from '#app/lib/uasApi/uasUtility';
import getRecentActivity from '#app/lib/uasApi/getRecentActivity';
import styles from './styles';

interface MyNewsPageState {
  savedArticles: SavedArticle[];
  totalItems: number;
  isLoading: boolean;
  error: string | null;
}

const ITEMS_PER_PAGE = 10;

const MyNewsPage = () => {
  const router = useRouter();
  const { translations, lang } = useContext(ServiceContext);

  const [state, setState] = useState<MyNewsPageState>({
    savedArticles: [],
    totalItems: 0,
    isLoading: true,
    error: null,
  });

  const pageFromQuery = Array.isArray(router.query.page)
    ? router.query.page[0]
    : router.query.page;
  const activePage = Math.max(1, Number(pageFromQuery ?? 1));

  // Fetch data client-side when component mounts or page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
        const { savedArticles, total } = await getRecentActivity({
          itemsPerPage: ITEMS_PER_PAGE,
          startIndex,
        });

        setState({
          savedArticles,
          totalItems: total,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load articles';
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
      }
    };

    fetchData();
  }, [router.query.service, activePage]);

  const pageCount = Math.max(1, Math.ceil(state.totalItems / ITEMS_PER_PAGE));
  const safeActivePage = Math.min(activePage, pageCount);

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
    activePage >= 2 ? `My News, ${translatedPage}` : 'My News';

  const renderContent = () => {
    if (state.isLoading) {
      return (
        <div css={styles.empty}>
          <h2 css={styles.heading}>My News</h2>
          <p>Loading your articles...</p>
        </div>
      );
    }

    if (state.error) {
      return (
        <div css={styles.empty}>
          <h2 css={styles.heading}>My News</h2>
          <p>Error loading articles: {state.error}</p>
        </div>
      );
    }

    if (state.savedArticles.length > 0) {
      return (
        <>
          <h2 css={styles.heading}>My News</h2>
          <CurationGrid
            summaries={state.savedArticles}
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
        <h2 css={styles.heading}>My News</h2>
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
