import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import Topics from '#containers/TopicTags';
import WithContexts from '../PageHandlers/withContexts';
import * as clickTracker from '#hooks/useClickTrackerHandler';
import * as viewTracker from '#hooks/useViewTracker';

const withContexts = ({ children }) => (
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
    withContexts(<Topics />),
  );

  shouldMatchSnapshot(
    'should render correctly with a single tag',
    withContexts(<Topics topics={[{ topicName: 'topic', topicId: '123' }]} />),
  );

  shouldMatchSnapshot(
    'should render correctly with multiple tags',
    withContexts(
      <Topics
        topics={[
          { topicName: 'topic1', topicId: '1' },
          { topicName: 'topic2', topicId: '2' },
          { topicName: 'topic3', topicId: '3' },
        ]}
      />,
    ),
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
