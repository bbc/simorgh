import CurationGrid from '#app/components/Curation/CurationGrid';
import Heading from '#app/components/Heading';
import Pagination from '#app/components/Pagination';
import MetadataContainer from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { use } from 'react';
import useUASRecentActivity from '#app/hooks/useUASRecentActivity';
import Text from '#app/components/Text';
import styles from '../styles';
import MyNewsPageLoading from './MyNewsPageLoading';

const ITEMS_PER_PAGE = 10;

interface MyNewsPageContentProps {
  page?: number | string;
}

const MyNewsPageContent = ({ page }: MyNewsPageContentProps) => {
  const { translations, lang } = use(ServiceContext);

  const activePage = Number(page) || 1;
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;

  const { savedArticles, total, isLoading, error } = useUASRecentActivity({
    itemsPerPage: ITEMS_PER_PAGE,
    startIndex,
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

  const translatedPage = pageXOfY
    .replace('{x}', String(activePage))
    .replace('{y}', String(pageCount));

  // TODO: To be updated with translations
  const metadataTitle =
    activePage >= 2 ? `My News, ${translatedPage}` : 'My News';

  if (isLoading) {
    return <MyNewsPageLoading />;
  }

  const renderContent = () => {
    if (error) {
      return (
        <Text size="doublePica" fontVariant="sansBold">
          This content does not seem to be working. Please try again later.
        </Text>
      );
    }

    if (!savedArticles.length) {
      return (
        <Text size="doublePica" fontVariant="sansBold">
          You haven&apos;t saved any articles yet
        </Text>
      );
    }

    return (
      <>
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
      <Heading level={1} css={styles.heading}>
        My News
      </Heading>
      {renderContent()}
    </>
  );
};

export default MyNewsPageContent;
