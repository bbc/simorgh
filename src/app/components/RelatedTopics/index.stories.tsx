import { StoryArgs, StoryProps } from '#app/models/types/storybook';
import RelatedTopics from '.';
import readme from './README.md';
import mundoArticle from '#data/mundo/articles/cddylv9g8z0o.json';

const topics =
  (mundoArticle as any).data.article.metadata.topics?.map(
    ({ topicName, topicId }: { topicName: string; topicId: string }) => ({
      topicName,
      topicId,
    }),
  ) || [];

const Component = (_: StoryArgs, __: StoryProps) => (
  <RelatedTopics topics={topics.slice(0, 5)} />
);

export default {
  title: 'Components/RelatedTopics',
  Component,
  parameters: {
    docs: { readme },
  },
};

export const Multiple = Component;

export const Single = () => <RelatedTopics topics={[topics[0]]} />;
