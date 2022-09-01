/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import RelatedTopics from '#containers/RelatedTopics';
import * as clickTracker from '#hooks/useClickTrackerHandler';
import * as viewTracker from '#hooks/useViewTracker';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';

beforeEach(() => {
  jest.resetModules();
});

const WithContexts = ({
  children,
  variant,
  service = 'mundo',
  isAmp = false,
  pageType = STORY_PAGE,
}) => {
  return (
    <RequestContextProvider
      service={service}
      variant={variant}
      pageType={pageType}
      isAmp={isAmp}
      pathname="/"
    >
      <ServiceContextProvider service={service}>
        <ToggleContextProvider
          toggles={{
            eventTracking: {
              enabled: true,
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

describe('Expected use', () => {
  shouldMatchSnapshot(
    'should render correctly with no tags',
    <WithContexts>
      <RelatedTopics />
    </WithContexts>,
  );

  shouldMatchSnapshot(
    'should render correctly with a single tag',
    <WithContexts>
      <RelatedTopics topics={[{ topicName: 'topic', topicId: '123' }]} />
    </WithContexts>,
  );

  shouldMatchSnapshot(
    'should render correctly with multiple tags',
    <WithContexts>
      <RelatedTopics
        topics={[
          { topicName: 'topic1', topicId: '1' },
          { topicName: 'topic2', topicId: '2' },
          { topicName: 'topic3', topicId: '3' },
        ]}
      />
      ,
    </WithContexts>,
  );

  it('should construct the correct topics href given a topic id without a variant', () => {
    const topic = {
      topicName: 'foo',
      topicId: 'bar',
    };

    const { getByText } = render(
      <WithContexts service="pidgin">
        <RelatedTopics topics={[topic]} />
      </WithContexts>,
    );

    expect(getByText(topic.topicName)).toHaveAttribute(
      'href',
      `/pidgin/topics/${topic.topicId}`,
    );
  });

  it('should construct the correct topics href given a topic id when service=cymrufyw', () => {
    const topic = {
      topicName: 'foo',
      topicId: 'bar',
    };

    const { getByText } = render(
      <WithContexts service="cymrufyw">
        <RelatedTopics topics={[topic]} />
      </WithContexts>,
    );

    expect(getByText(topic.topicName)).toHaveAttribute(
      'href',
      `/cymrufyw/pynciau/${topic.topicId}`,
    );
  });

  it('should construct the correct topics href given a topic id and a variant', () => {
    const topic = {
      topicName: 'foo',
      topicId: 'bar',
    };

    const { getByText } = render(
      <WithContexts service="uzbek" variant="cyr">
        <RelatedTopics topics={[topic]} />
      </WithContexts>,
    );

    expect(getByText(topic.topicName)).toHaveAttribute(
      'href',
      `/uzbek/cyr/topics/${topic.topicId}`,
    );
  });
});

describe('A11y', () => {
  it('should not render an unordered list when there is only one topic', () => {
    const { container } = render(
      <WithContexts>
        <RelatedTopics topics={[{ topicName: 'topic1', topicId: '1' }]} />
      </WithContexts>,
    );
    expect(container.querySelector('ul')).toBeNull();
  });

  it('should render an unordered list when there is more than one topic', () => {
    const { container } = render(
      <WithContexts>
        <RelatedTopics
          topics={[
            { topicName: 'topic1', topicId: '1' },
            { topicName: 'topic2', topicId: '2' },
          ]}
        />
      </WithContexts>,
    );
    expect(container.querySelector('ul')).not.toBeNull();
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
        <RelatedTopics topics={[{ topicName: 'topic', topicId: 'id' }]} />
      </WithContexts>,
    );

    expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
  });

  it('should call the view tracker with the correct params', () => {
    const viewTrackerSpy = jest.spyOn(viewTracker, 'default');
    render(
      <WithContexts>
        <RelatedTopics topics={[{ topicName: 'topic', topicId: 'id' }]} />
      </WithContexts>,
    );

    expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
  });
});
