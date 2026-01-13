import UsefulLinks from '#app/components/UsefulLinks';
import useServiceTopics from '#app/hooks/useServiceTopics';
import { Summary } from '#app/models/types/curationData';
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

const TopicsPage = ({ service }) => {
  const { topicsData, error } = useServiceTopics(service);

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

  return (
    <section>
      <div css={styles.usefulLinksWrapper}>
        <UsefulLinks
          title={headline || 'Topics'}
          summaries={summaries}
          id={`${service}-topics`}
        />
      </div>
    </section>
  );
};

export default TopicsPage;
