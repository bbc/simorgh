import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import latin from '#app/components/ThemeProvider/fontScripts/latin';
import { Services } from '#app/models/types/global';
import { StoryArgs } from '#app/models/types/storybook';
import readme from './README.md';
import { TopicTags, TopicTag } from '.';

interface Props {
  service: Services;
  text: string;
  script?: object;
}

const DefaultStory = (_: StoryArgs, { service, text, script }: Props) => {
  const shortText = service === 'news' ? text : text.trim().split(' ')[0];

  return (
    <ThemeProvider service={service}>
      <ServiceContextProvider service={service}>
        <TopicTags service={service} script={script || latin}>
          <TopicTag name={shortText} link="#" />
        </TopicTags>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

const MultipleStory = (_: StoryArgs, { service, text, script }: Props) => {
  const textArray =
    service === 'ukchina'
      ? [text.trim().split(' ')[0], text.trim().split(' ')[0]]
      : text.trim().split(' ');

  return (
    <ThemeProvider service={service}>
      <ServiceContextProvider service={service}>
        <TopicTags service={service} script={script || latin}>
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
    script: latin,
  },
};

export const Default = DefaultStory;
export const Multiple = MultipleStory;
