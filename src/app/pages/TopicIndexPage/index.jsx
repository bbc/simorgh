const TopicIndexPage = ({ pageData }) => {
  const title = pageData?.title || 'Topics';
  const topics = pageData?.topics || [];

  return (
    <main>
      <h1>{title}</h1>

      <ul>
        {topics.map(topic => (
          <li key={topic?.id || topic?.slug || topic?.title}>
            <a href={topic?.url || '#'}>{topic?.title || 'Topic'}</a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TopicIndexPage;
