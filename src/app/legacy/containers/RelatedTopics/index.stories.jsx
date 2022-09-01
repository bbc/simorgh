/* eslint-disable react/prop-types */
import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
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
        <ServiceContextProvider service={service}>
          <EventTrackingContextProvider>
            {children}
          </EventTrackingContextProvider>
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
  );
};

export default {
  component: RelatedTopics,
  title: 'Containers/Related Topics',
  decorators: [withKnobs, withServicesKnob()],
};

export const RelatedTopicsSingle = ({ service, variant, text }) => (
  <WithContexts service={service} variant={variant}>
    <RelatedTopics topics={[{ topicName: text, topicId: 'topicId' }]} />
  </WithContexts>
);

export const RelatedTopicsMultiple = ({ service, variant, text }) => {
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
