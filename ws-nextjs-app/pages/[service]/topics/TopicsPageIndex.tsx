import UsefulLinks from '#app/components/UsefulLinks';
import { Summary } from '#app/models/types/curationData';
import Pagination from '#app/components/Pagination';
import styles from './index.styles';
import { TopicsPageProps, Topic } from './types';

const PAGE_SIZE = 100;

const TopicsPage = ({ service, topicsData, page }: TopicsPageProps) => {
  const activePage = Math.max(1, Number(page ?? 1));
  const headline = topicsData?.headline || '';
  const topics = Array.isArray(topicsData?.topics) ? topicsData.topics : [];

  const summaries = topics.map((topic: Topic) => ({
    id: topic.topicId,
    title: topic.topicName,
    link: topic.topicUrl,
  })) as unknown as Summary[];

  const totalItems = summaries.length;
  const pageCount = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safeActivePage = Math.min(activePage, pageCount);

  const start = (safeActivePage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pagedSummaries = summaries.slice(start, end);

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
  };

  return (
    <section css={styles.container}>
      <div css={styles.usefulLinksWrapper}>
        <UsefulLinks
          title={headline}
          summaries={pagedSummaries}
          id={`${service}-topics`}
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
    </section>
  );
};
export default TopicsPage;
