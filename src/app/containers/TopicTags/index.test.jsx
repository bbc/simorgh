/* eslint-disable react/prop-types */
import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import Topics from '#containers/TopicTags';
import * as clickTracker from '#hooks/useClickTrackerHandler';
import * as viewTracker from '#hooks/useViewTracker';

const WithContexts = ({ children }) => (
  <ServiceContextProvider service="mundo">
    <ToggleContextProvider
      toggles={{
        eventTracking: {
          enabled: true,
        },
      }}
    >
      <EventTrackingContextProvider>{children}</EventTrackingContextProvider>
    </ToggleContextProvider>
  </ServiceContextProvider>
);

describe('TopicTags', () => {
  // Different variations match snapshots
  // Should call event tracking hooks

  shouldMatchSnapshot(
    'should render correctly with no tags',
    <WithContexts>
      <Topics />
    </WithContexts>,
  );

  shouldMatchSnapshot(
    'should render correctly with a single tag',
    <WithContexts>
      <Topics topics={[{ topicName: 'topic', topicId: '123' }]} />
    </WithContexts>,
  );

  shouldMatchSnapshot(
    'should render correctly with multiple tags',
    <WithContexts>
      <Topics
        topics={[
          { topicName: 'topic1', topicId: '1' },
          { topicName: 'topic2', topicId: '2' },
          { topicName: 'topic3', topicId: '3' },
        ]}
      />
      ,
    </WithContexts>,
  );
});

describe('Event Tracking', () => {
  const eventTrackingData = {
    componentName: 'topic-tags',
  };

  it('should call the click tracker with the correct params', () => {
    const clickTrackerSpy = jest.spyOn(clickTracker, 'default');
    render(
      <WithContexts>
        <Topics topics={[{ topicName: 'topic', topicId: 'id' }]} />
      </WithContexts>,
    );

    expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
  });
});
