import UsefulLinks from '#app/components/UsefulLinks';
import Heading from '#app/components/Heading';
import { Summary } from '#app/models/types/curationData';
import { Services } from '#app/models/types/global';
import { NOT_FOUND } from '#app/lib/statusCodes.const';
import styles from './index.styles';

type Topic = {
  topicName: string;
  topicUrl: string;
  topicId?: string;
};

type TopicsData = {
  headline: string;
  topics: Topic[];
};

type TopicsPageProps = {
  service: Services;
  status?: number;
  topicsData: TopicsData | null;
};

const TopicsPage = ({ service, status, topicsData }: TopicsPageProps) => {
  if (status === NOT_FOUND) {
    // TODO: implement the not found
  }

  const headline = topicsData?.headline || '';
  const topics = Array.isArray(topicsData?.topics) ? topicsData.topics : [];

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
