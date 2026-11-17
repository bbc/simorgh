import { TopicDiscoveryItem } from '../TopicDiscovery/types';

export const MAX_TOPICS = 5;
export const MAX_VIDEOS = 4;
export const MIN_VIDEOS = 2;

const hasText = (value?: string) => Boolean(value && value.trim());

const getPath = (link: string) => {
  try {
    return new URL(link, 'https://www.bbc.com').pathname.replace(/\/$/, '');
  } catch {
    return null;
  }
};

export const normaliseTopicIds = (topicIds: Array<string | undefined>) =>
  [
    ...new Set(topicIds.map(id => id?.trim()).filter(Boolean) as string[]),
  ].slice(0, MAX_TOPICS);

const isEligibleVideo = (item: TopicDiscoveryItem, currentPath: string) => {
  if (item?.type !== 'video' || !hasText(item.id) || !hasText(item.title)) {
    return false;
  }
  if (!hasText(item.link)) return false;
  const path = getPath(item.link);
  return Boolean(path) && path !== currentPath.replace(/\/$/, '');
};

/**
 * Takes results grouped per topic (in topic order), keeps only structured
 * `type: 'video'` items, removes the current page and duplicates, and
 * interleaves topics so every topic is represented before any repeats.
 */
const selectTopicVideos = (
  resultsByTopic: TopicDiscoveryItem[][],
  currentPath: string,
  limit = MAX_VIDEOS,
): TopicDiscoveryItem[] => {
  const queues = resultsByTopic.map(items =>
    (Array.isArray(items) ? items : []).filter(item =>
      isEligibleVideo(item, currentPath),
    ),
  );
  const seenIds = new Set<string>();
  const seenPaths = new Set<string>();
  const selected: TopicDiscoveryItem[] = [];
  const longest = Math.max(0, ...queues.map(queue => queue.length));

  for (let i = 0; i < longest && selected.length < limit; i += 1) {
    for (const queue of queues) {
      const item = queue[i];
      if (item && selected.length < limit) {
        const path = getPath(item.link) as string;
        if (!seenIds.has(item.id) && !seenPaths.has(path)) {
          seenIds.add(item.id);
          seenPaths.add(path);
          selected.push(item);
        }
      }
    }
  }

  return selected;
};

export default selectTopicVideos;
