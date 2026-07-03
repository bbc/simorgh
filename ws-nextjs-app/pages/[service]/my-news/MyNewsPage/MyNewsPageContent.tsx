import CurationGrid from '#app/components/Curation/CurationGrid';
import Heading from '#app/components/Heading';
import Pagination from '#app/components/Pagination';
import MetadataContainer from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { use } from 'react';
import useUASRecentActivity from '#app/hooks/useUASRecentActivity';
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
      <Heading level={1} css={styles.heading}>
        {title}
      </Heading>
      {renderContent()}
    </>
  );
};

export default MyNewsPageContent;
