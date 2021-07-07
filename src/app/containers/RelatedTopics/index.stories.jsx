/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import RelatedTopics from '.';

const WithContexts = ({
  children,
  variant,
  optimoEnabled = true,
  cpsEnabled = true,
  service = 'mundo',
}) => {
  return (
    <ToggleContextProvider
      toggles={{
        eventTracking: {
          enabled: true,
        },
        cpsTopicsTags: {
          enabled: cpsEnabled,
        },
        optimoTopicsTags: {
          enabled: optimoEnabled,
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

storiesOf('Containers/RelatedTopics', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(`single topic`, ({ service, variant, text }) => (
    <WithContexts service={service} variant={variant}>
      <RelatedTopics topics={[{ topicName: text, topicId: 'topicId' }]} />
    </WithContexts>
  ));

storiesOf('Containers/RelatedTopics', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(`multiple topics`, ({ service, variant, text }) => {
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
  });
