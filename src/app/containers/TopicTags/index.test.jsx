/* eslint-disable react/prop-types */
import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import Topics from '#containers/TopicTags';
import * as clickTracker from '#hooks/useClickTrackerHandler';
import * as viewTracker from '#hooks/useViewTracker';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

const WithContexts = ({ children, enabled = true }) => {
  return (
    <RequestContextProvider
      service="mundo"
      pageType={STORY_PAGE}
      isAmp={false}
      pathname="/"
    >
      <ServiceContextProvider service="mundo">
        <ToggleContextProvider
          toggles={{
            eventTracking: {
              enabled: true,
            },
            topicsTags: {
              enabled,
            },
          }}
        >
          <EventTrackingContextProvider>
            {children}
          </EventTrackingContextProvider>
        </ToggleContextProvider>
      </ServiceContextProvider>
    </RequestContextProvider>
  );
};

describe('TopicTags', () => {
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

  it('should not render an unordered list when there is only one topic', () => {
    const { container } = render(
      <WithContexts>
        <Topics
          topics={[{ topicName: 'topic1', topicId: '1' }]}
          data-testid="topics"
        />
      </WithContexts>,
    );
    expect(container.querySelector('ul')).toBeNull();
  });

  it('should render an unordered list when there is more than one topic', () => {
    const { container } = render(
      <WithContexts>
        <Topics
          topics={[
            { topicName: 'topic1', topicId: '1' },
            { topicName: 'topic2', topicId: '2' },
          ]}
          data-testid="topics"
        />
      </WithContexts>,
    );
    expect(container.querySelector('ul')).not.toBeNull();
  });

  it('should return null when the topicsTags toggle is disabled', () => {
    const { container } = render(
      <WithContexts enabled={false}>
        <Topics
          topics={[
            { topicName: 'topic1', topicId: '1' },
            { topicName: 'topic2', topicId: '2' },
            { topicName: 'topic3', topicId: '3' },
          ]}
        />
      </WithContexts>,
    );

    expect(container.firstChild).toBeNull();
  });
});

describe('Event Tracking', () => {
  const eventTrackingData = {
    componentName: 'topics',
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

  it('should call the view tracker with the correct params', () => {
    const viewTrackerSpy = jest.spyOn(viewTracker, 'default');
    render(
      <WithContexts>
        <Topics topics={[{ topicName: 'topic', topicId: 'id' }]} />
      </WithContexts>,
    );

    expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
  });
});
