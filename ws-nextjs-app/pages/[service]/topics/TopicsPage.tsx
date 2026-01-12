import Heading from '#app/components/Heading';
import useServiceTopics from '#app/hooks/useServiceTopics';

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

  return (
    <section>
      {headline && (
        <Heading level={1} tabIndex={-1} id="content">
          {headline}
        </Heading>
      )}
      {topics.map(topic => (
        <article key={topic.topicId}>
          <Heading level={3}>
            <a
              href={topic.topicUrl}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {topic.topicName}
            </a>
          </Heading>
        </article>
      ))}
    </section>
  );
};

export default TopicsPage;
