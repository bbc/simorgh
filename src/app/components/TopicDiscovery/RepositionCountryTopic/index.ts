import type { ExtractedTopic } from '..';

const COUNTRY_TOPIC_TARGET_INDEX = 2;

const repositionCountryTopic = (
  topics: ExtractedTopic[],
  countryTopicIdToReorder: string | null,
): ExtractedTopic[] => {
  if (!countryTopicIdToReorder || topics.length === 0) return topics;

  if (topics[0].topicId !== countryTopicIdToReorder) return topics;

  const reorderedTopics = [...topics];
  const [countryTopic] = reorderedTopics.splice(0, 1);

  // If there are fewer than three topics, insert at the end
  const insertAt = Math.min(COUNTRY_TOPIC_TARGET_INDEX, reorderedTopics.length);
  reorderedTopics.splice(insertAt, 0, countryTopic);

  return reorderedTopics;
};

export default repositionCountryTopic;
