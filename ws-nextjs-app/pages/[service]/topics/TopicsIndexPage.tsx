import UsefulLinks from '#app/components/UsefulLinks';
import Pagination from '#app/components/Pagination';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { useContext } from 'react';
import MetadataContainer from '#app/components/Metadata';
import { TopicsPageProps } from '#app/lib/config/fixtures/types';

import styles from './index.styles';

const PAGE_SIZE = 100;

const TopicsPage = ({ service, topicsData, page }: TopicsPageProps) => {
  const { translations, lang } = useContext(ServiceContext);

  const activePage = Math.max(1, Number(page ?? 1));
  const headline = topicsData?.headline || '';
  const { summaries, totalItems } = topicsData;
  const pageCount = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safeActivePage = Math.min(activePage, pageCount);

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
