import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { TopicTags, TopicTag } from '#containers/TopicTags';

const withContexts = ({ children }) => (
  <EventTrackingContextProvider>{children}</EventTrackingContextProvider>
);

describe('TopicTags', () => {
  // Different variations match snapshots
  // Should call event tracking hooks

  shouldMatchSnapshot(
    'should render correctly with no tags',
    withContexts(<TopicTags />),
  );

  shouldMatchSnapshot(
    'should render correctly with a single tag',
    withContexts(
      <TopicTags>
        <TopicTag />
      </TopicTags>,
    ),
  );

  shouldMatchSnapshot(
    'should render correctly with multiple tags',
    withContexts(
      <TopicTags>
        <TopicTag />
        <TopicTag />
        <TopicTag />
      </TopicTags>,
    ),
  );


});
