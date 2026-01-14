import UsefulLinks from '#app/components/UsefulLinks';
import useServiceTopics from '#app/hooks/useServiceTopics';
import { Summary } from '#app/models/types/curationData';
import { useRouter } from 'next/router';
import Pagination from '#app/components/Pagination';
import styles from './index.styles';

// const REQUIRED_FIELDS = ['id', 'title', 'seoTitle', 'seoDescription']; // TODO: implement after fixture validation

// const validateTopics = (topics: TopicTag[]) => {
//   return topics.map(topic => {
//     const missingFields = REQUIRED_FIELDS.filter(field => !topic[field]);
//     if (missingFields.length > 0) {
//       // eslint-disable-next-line no-console
//       console.error(
//         'Invalid topic data:',
//         topic,
//         'Missing fields:',
//         missingFields,
//       );
//     }
//     return topic;
//   });
// };
const PAGE_SIZE = 100;

const TopicsPage = ({ service }) => {
  const { topicsData, error } = useServiceTopics(service);

  const router = useRouter();
  const activePage = Math.max(1, Number(router.query.page)) || 1;

  if (error) {
    return <div role="alert">No topics data available for this service.</div>;
  }
  if (!topicsData) {
    return <div>Loading topics…</div>;
  }

  const headline = topicsData.headline || '';
  const topics = Array.isArray(topicsData.topics) ? topicsData.topics : [];

  const summaries = topics.map(topic => ({
    id: topic.topicId,
    title: topic.topicName,
    uri: topic.topicUrl,
  })) as unknown as Summary[];

  const totalItems = summaries.length;
  const pageCount = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safeActivePage = Math.min(activePage, pageCount);

  const start = (safeActivePage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pagedSummaries = summaries.slice(start, end);

  const pageXOfY = 'Page {x} of {y}';
  const previousPage = 'Previous page';
  const nextPage = 'Next page';
  const page = 'Page';

  return (
    <section>
      <div css={styles.usefulLinksWrapper}>
        <UsefulLinks
          title={headline || 'Topics'}
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
            page={page}
          />
        )}
      </div>
    </section>
  );
};

export default TopicsPage;
