import { Services } from '#app/models/types/global';
import { StoryArgs } from '#app/models/types/storybook';
import readme from './README.md';
import { TopicTags } from '.';

interface Props {
  service: Services;
  text: string;
}

const DefaultStory = (_: StoryArgs, { service, text }: Props) => {
  const shortText = service === 'news' ? text : text.trim().split(' ')[0];

  return <TopicTags tags={[{ topicName: shortText, topicId: '123' }]} />;
};

const MultipleStory = (_: StoryArgs, { service, text }: Props) => {
  const textArray =
    service === 'ukchina'
      ? [text.trim().split(' ')[0], text.trim().split(' ')[0]]
      : text.trim().split(' ');

  const tags = textArray.map((word, index) => ({
    topicName: word,
    topicId: `${123 + index}`,
  }));

  return <TopicTags tags={tags} />;
};

export default {
  title: 'Components/TopicTags',
  Component: DefaultStory,
  parameters: {
    docs: { readme },
  },
  args: {
    service: 'ukchina',
    text: 'Tag 1 Tag 2 Tag 3 Tag 4',
  },
};

export const Default = DefaultStory;
export const Multiple = MultipleStory;
