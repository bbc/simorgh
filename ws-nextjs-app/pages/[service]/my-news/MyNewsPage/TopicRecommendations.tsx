import { use, useEffect, useState } from 'react';
import FollowTopicButton from '#app/components/FollowTopicButton';
import Heading from '#app/components/Heading';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import getTopicPageUrl from '#app/lib/utilities/getTopicPageUrl';
import type { Services } from '#app/models/types/global';
import styles from './TopicRecommendations.module.scss';

const TOPICS_STORAGE_KEY = 'ws_bbc_topics';

type TopicRecommendation = {
  topicId: string;
  title: string;
  count: number;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const getServiceTopics = (contents: string, service: Services) => {
  const parsedContents: unknown = JSON.parse(contents);

  if (!isRecord(parsedContents) || !isRecord(parsedContents[service])) {
    return [];
  }

  const topicsById = new Map<string, TopicRecommendation>();

  Object.entries(parsedContents[service]).forEach(([title, value]) => {
    if (!title.trim() || !isRecord(value)) return;

    const { id, count } = value;

    if (
      typeof id !== 'string' ||
      !id ||
      typeof count !== 'number' ||
      !Number.isFinite(count) ||
      count <= 0
    ) {
      return;
    }

    const existing = topicsById.get(id);

    if (!existing || count > existing.count) {
      topicsById.set(id, { topicId: id, title, count });
    }
  });

  return Array.from(topicsById.values()).sort(
    (first, second) => second.count - first.count,
  );
};

interface TopicRecommendationsProps {
  followedTopicIds?: string[];
}

const TopicRecommendations = ({
  followedTopicIds = [],
}: TopicRecommendationsProps) => {
  const { service, translations } = use(ServiceContext);
  const { variant } = use(RequestContext);
  const [storedTopics, setStoredTopics] = useState<TopicRecommendation[]>([]);
  const heading =
    translations?.myNews?.recommendedTopicsTitle ?? 'Recommended topics';

  useEffect(() => {
    try {
      const contents = window.localStorage.getItem(TOPICS_STORAGE_KEY);
      setStoredTopics(contents ? getServiceTopics(contents, service) : []);
    } catch {
      setStoredTopics([]);
    }
  }, [service]);

  const followedIds = new Set(followedTopicIds);
  const recommendations = storedTopics.filter(
    topic => !followedIds.has(topic.topicId),
  );

  if (recommendations.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="recommended-topics">
      <Heading
        id="recommended-topics"
        level={2}
        size="doublePica"
        className={styles.heading}
      >
        {heading}
      </Heading>
      <ul className={styles.topicList}>
        {recommendations.map(({ topicId, title }) => {
          const url = getTopicPageUrl({
            service,
            topicId,
            variant,
            topicsPath: translations?.topicsPath,
            absolute: true,
          });

          return (
            <li className={styles.topicItem} key={topicId}>
              <a className={styles.topicLink} href={url}>
                {title}
              </a>
              <FollowTopicButton topicData={{ topicId, title, url }} compact />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TopicRecommendations;
