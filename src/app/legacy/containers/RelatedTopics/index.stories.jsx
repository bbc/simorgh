import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import RelatedTopics from '.';

const WithContexts = ({ children, variant, service = 'mundo' }) => {
  return (
    <ToggleContextProvider
      toggles={{
        eventTracking: {
          enabled: true,
        },
      }}
    >
      <RequestContextProvider
        service={service}
        variant={variant}
        pageType={STORY_PAGE}
        isAmp={false}
        pathname="/"
      >
        <EventTrackingContextProvider>{children}</EventTrackingContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
  );
};

export default {
  component: RelatedTopics,
  title: 'Containers/Related Topics',
};

export const RelatedTopicsSingle = (_, { service, variant, text }) => (
  <WithContexts service={service} variant={variant}>
    <RelatedTopics topics={[{ topicName: text, topicId: 'topicId' }]} />
  </WithContexts>
);

export const RelatedTopicsMultiple = (_, { service, variant, text }) => {
  const textArray = text.split(' ');
  const topics = textArray.map((item, index) => ({
    topicName: item,
    topicId: `id${index}`,
  }));
  return (
    <WithContexts service={service} variant={variant}>
      <RelatedTopics topics={topics} />
    </WithContexts>
  );
};
