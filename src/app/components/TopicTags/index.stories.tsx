import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
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
    <ThemeProvider service={service}>
      <ServiceContextProvider service={service}>
        <TopicTags>
          <TopicTag name={shortText} link="#" />
        </TopicTags>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

const MultipleStory = (_: StoryArgs, { service, text }: Props) => {
  const textArray =
    service === 'ukchina'
      ? [text.trim().split(' ')[0], text.trim().split(' ')[0]]
      : text.trim().split(' ');

  return (
    <ThemeProvider service={service}>
      <ServiceContextProvider service={service}>
        <TopicTags>
          {textArray.map((word, index) => (
            <TopicTag key={index} name={word} link="#" />
          ))}
        </TopicTags>
      </ServiceContextProvider>
    </ThemeProvider>
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
