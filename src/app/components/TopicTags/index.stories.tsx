import { Services } from '#app/models/types/global';
import { StoryArgs } from '#app/models/types/storybook';
import readme from './README.md';
import { TopicTags, TopicTag } from '.';

interface Props {
  service: Services;
  text: string;
}

const DefaultStory = (_: StoryArgs, { service, text }: Props) => {
  const shortText = service === 'news' ? text : text.trim().split(' ')[0];

  return (
    <TopicTags>
      <TopicTag name={shortText} link="#" />
    </TopicTags>
  );
};

const MultipleStory = (_: StoryArgs, { service, text }: Props) => {
  const textArray =
    service === 'ukchina'
      ? [text.trim().split(' ')[0], text.trim().split(' ')[0]]
      : text.trim().split(' ');

  return (
    <TopicTags>
      {textArray.map((word, index) => (
        <TopicTag key={index} name={word} link="#" />
      ))}
    </TopicTags>
  );
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
