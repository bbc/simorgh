import { StoryArgs, StoryProps } from '#app/models/types/storybook';
import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { EventTrackingContextProvider } from '#app/contexts/EventTrackingContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { Services } from '#app/models/types/global';
import RelatedTopics from '.';
import readme from './README.md';
import mundoArticle from '#data/mundo/articles/cddylv9g8z0o.json';

interface Props extends StoryProps {
  service: Services;
}

const topics =
  (mundoArticle as any).data.article.metadata.topics?.map(
    ({ topicName, topicId }: { topicName: string; topicId: string }) => ({
      topicName,
      topicId,
    }),
  ) || [];

const Component = (_: StoryArgs, { service }: Props) => (
  <ToggleContextProvider>
    <ThemeProvider service={service}>
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          pageType={STORY_PAGE}
          pathname="/example"
          service={service}
        >
          <EventTrackingContextProvider>
            <RelatedTopics
              topics={topics.slice(0, 5)}
              backgroundColour="#F6F6F6"
              tagBackgroundColour="#FFFFFF"
            />
          </EventTrackingContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ThemeProvider>
  </ToggleContextProvider>
);

export default {
  title: 'Components/RelatedTopics',
  Component,
  parameters: {
    docs: { readme },
  },
};

export const Multiple = Component;

export const Single = (_: StoryArgs, props: Props) => (
  <ToggleContextProvider>
    <ThemeProvider service={props.service}>
      <ServiceContextProvider service={props.service}>
        <RequestContextProvider
          pageType={STORY_PAGE}
          pathname="/example"
          service={props.service}
        >
          <EventTrackingContextProvider>
            <RelatedTopics
              topics={[topics[0]]}
              backgroundColour="#F6F6F6"
              tagBackgroundColour="#FFFFFF"
            />
          </EventTrackingContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ThemeProvider>
  </ToggleContextProvider>
);
