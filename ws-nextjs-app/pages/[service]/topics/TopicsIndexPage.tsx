import { useContext } from 'react';

import ATIAnalytics from '#app/components/ATIAnalytics';
import MetadataContainer from '#app/components/Metadata';
import Pagination from '#app/components/Pagination';
import UsefulLinks from '#app/components/UsefulLinks';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { TopicsPageProps } from '#app/lib/config/fixtures/types';
import styles from './index.styles';

const TopicsPage = ({
  service,
  pageData,
  activePage,
  pageCount,
  safeActivePage,
}: TopicsPageProps) => {
  const { translations, lang } = useContext(ServiceContext);
  const { summaries, headline } = pageData || {};
  const atiAnalytics = pageData?.metadata?.atiAnalytics;
  const {
    pageXOfY,
    previousPage,
    nextPage,
    page: pageLabel,
  } = {
    pageXOfY: 'Page {x} of {y}',
    previousPage: 'Previous page',
    nextPage: 'Next page',
    page: 'Page',
    ...translations?.pagination,
  };

  const translatedPage = pageXOfY
    .replace('{x}', String(safeActivePage))
    .replace('{y}', String(pageCount));

  const seoPaginatedTitle = `${headline}, ${translatedPage}`;
  const metadataTitle = activePage >= 2 ? seoPaginatedTitle : headline;

  return (
    <main css={styles.container}>
      <ATIAnalytics atiData={atiAnalytics} />
      <MetadataContainer
        title={metadataTitle}
        openGraphType="website"
        hasAmpPage={false}
        lang={lang}
      />
      <div css={styles.usefulLinksWrapper}>
        <UsefulLinks
          title={headline}
          summaries={summaries}
          id={`${service}-topics`}
          layout="single"
          headingLevel={1}
          eventTrackingData={{
            componentName: 'topics-index-links',
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
      </div>
    </main>
  );
};
export default TopicsPage;
