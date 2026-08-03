import repositionCountryTopic from '.';
import { ExtractedTopic } from '..';

describe('repositionCountryTopic', () => {
  const COUNTRY_TOPIC_ID = 'c6vzy3wd189t';

  const topics: ExtractedTopic[] = [
    {
      topicId: COUNTRY_TOPIC_ID,
      topicName: 'Country Topic',
      topicUrl: '/country-topic',
    },
    { topicId: 'topic-2', topicName: 'Topic 2', topicUrl: '/topic-2' },
    { topicId: 'topic-3', topicName: 'Topic 3', topicUrl: '/topic-3' },
    { topicId: 'topic-4', topicName: 'Topic 4', topicUrl: '/topic-4' },
  ];
  it('should move the country topic from the first to the third position', () => {
    const result = repositionCountryTopic(topics, COUNTRY_TOPIC_ID);
    expect(result.map(topic => topic.topicId)).toEqual([
      'topic-2',
      'topic-3',
      COUNTRY_TOPIC_ID,
      'topic-4',
    ]);
  });

  it('should return the topics unchanged when the first position topic does not match', () => {
    const topicsWithCountryInSecondPosition: ExtractedTopic[] = [
      { topicId: 'topic-2', topicName: 'Topic 2', topicUrl: '/topic-2' },
      {
        topicId: COUNTRY_TOPIC_ID,
        topicName: 'Country Topic',
        topicUrl: '/country-topic',
      },
      { topicId: 'topic-3', topicName: 'Topic 3', topicUrl: '/topic-3' },
      { topicId: 'topic-4', topicName: 'Topic 4', topicUrl: '/topic-4' },
    ];
    const result = repositionCountryTopic(
      topicsWithCountryInSecondPosition,
      COUNTRY_TOPIC_ID,
    );
    expect(result).toEqual(topicsWithCountryInSecondPosition);
  });

  it('should return the topics unchanged when there is no country topic id', () => {
    const result = repositionCountryTopic(topics, null);
    expect(result).toEqual(topics);
  });
});
