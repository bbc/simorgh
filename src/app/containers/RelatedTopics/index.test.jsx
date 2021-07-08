/* eslint-disable react/prop-types */
import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import RelatedTopics from '#containers/RelatedTopics';
import * as clickTracker from '#hooks/useClickTrackerHandler';
import * as viewTracker from '#hooks/useViewTracker';
import { STORY_PAGE, ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

process.env.SIMORGH_BASE_URL = 'https://bbc.com';
const { env } = process;

beforeEach(() => {
  jest.resetModules();
  process.env.SIMORGH_APP_ENV = 'test';
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
  afterAll(() => {
    process.env = env;
  });

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
      `https://bbc.com/pidgin/topics/${topic.topicId}`,
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
      `https://bbc.com/uzbek/cyr/topics/${topic.topicId}`,
    );
  });

  it('should return null when on the live environment', () => {
    process.env.SIMORGH_APP_ENV = 'live';
    const { container } = render(
      <WithContexts optimoEnabled={false} pageType={ARTICLE_PAGE}>
        <RelatedTopics
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

  it('should return null when process is undefined', () => {
    process.env = undefined;

    const { container } = render(
      <WithContexts optimoEnabled={false} pageType={ARTICLE_PAGE}>
        <RelatedTopics
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
