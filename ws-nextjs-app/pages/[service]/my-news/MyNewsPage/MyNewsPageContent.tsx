import CurationGrid from '#app/components/Curation/CurationGrid';
import Heading from '#app/components/Heading';
import Pagination from '#app/components/Pagination';
import MetadataContainer from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { use, useEffect, useState } from 'react';
import useUASRecentActivity from '#app/hooks/useUASRecentActivity';
import Text from '#app/components/Text';
import styles from './styles';
import MyNewsPageLoading from './MyNewsPageLoading';
import MigrationSuccessBanner from './MigrationSuccessBanner';

const ITEMS_PER_PAGE = 24;
const MIGRATION_BANNER_KEY = 'bbc_show_migration_banner';

interface MyNewsPageContentProps {
  page?: string;
}

const MyNewsPageContent = ({ page }: MyNewsPageContentProps) => {
  const { translations, lang } = use(ServiceContext);
  const [showMigrationBanner, setShowMigrationBanner] = useState(false);

  const activePage = Math.max(1, Number(page) || 1);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;

  const { savedArticles, total, isLoading, error } = useUASRecentActivity({
    itemsPerPage: ITEMS_PER_PAGE,
    startIndex,
  });

  // Check if we should show the migration success banner
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const showBanner = sessionStorage.getItem(MIGRATION_BANNER_KEY);
    if (showBanner === 'true') {
      setShowMigrationBanner(true);
      // Clear the flag after showing
      sessionStorage.removeItem(MIGRATION_BANNER_KEY);

      // Auto-hide banner after 10 seconds
      const timer = setTimeout(() => {
        setShowMigrationBanner(false);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, []);

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

  if (isLoading) {
    return <MyNewsPageLoading />;
  }

  const renderContent = () => {
    if (error) {
      return (
        <Text size="doublePica" fontVariant="sansBold">
          {errorText}
        </Text>
      );
    }

    if (!savedArticles.length) {
      return (
        <Text size="doublePica" fontVariant="sansBold">
          {noArticles}
        </Text>
      );
    }

    return (
      <>
        <Heading level={2} css={styles.subheading} size="doublePica">
          {description}
        </Heading>
        <CurationGrid
          summaries={savedArticles}
          headingLevel={2}
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

      {showMigrationBanner && <MigrationSuccessBanner />}

      {renderContent()}
    </>
  );
};

export default MyNewsPageContent;
