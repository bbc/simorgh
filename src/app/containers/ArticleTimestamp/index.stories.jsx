import React from 'react';
import { storiesOf } from '@storybook/react';
import ArticleTimestamp from '.';
import { timestampGenerator } from '../Timestamp/helpers/testHelpers';

const threeHoursAgo = timestampGenerator({ hours: 3 });
const fiveHoursAgo = timestampGenerator({ hours: 5 });
const elevenHoursAgo = timestampGenerator({ hours: 11 });
const twelveHoursAgo = timestampGenerator({ hours: 12 });
const twentyFourHoursAgo = timestampGenerator({
  hours: 24,
  seconds: 1,
});
const twoDaysAgo = timestampGenerator({ days: 2 });
const threeDaysAgo = timestampGenerator({ days: 3 });

storiesOf('ArticleTimestamp', module)
  .add('default', () => (
    <ArticleTimestamp
      firstPublished={1530947227000}
      lastPublished={1552666749637}
    />
  ))
  .add(
    'lastPublished === firstPublished and firstPublished < 10 hours ago',
    () => (
      <ArticleTimestamp
        firstPublished={threeHoursAgo}
        lastPublished={threeHoursAgo}
      />
    ),
  )
  .add(
    'lastPublished === firstPublished and firstPublished today and > 10 hours ago',
    () => (
      <ArticleTimestamp
        firstPublished={elevenHoursAgo}
        lastPublished={elevenHoursAgo}
      />
    ),
  )
  .add(
    'lastPublished === firstPublished and firstPublished before today',
    () => (
      <ArticleTimestamp
        firstPublished={twentyFourHoursAgo}
        lastPublished={twentyFourHoursAgo}
      />
    ),
  )
  .add(
    'lastPublished today < 10 hours ago and firstPublished today < 10 hours ago',
    () => (
      <ArticleTimestamp
        firstPublished={fiveHoursAgo}
        lastPublished={threeHoursAgo}
      />
    ),
  )
  .add(
    'lastPublished today > 10 hours ago and firstPublished today > 10 hours ago',
    () => (
      <ArticleTimestamp
        firstPublished={twelveHoursAgo}
        lastPublished={elevenHoursAgo}
      />
    ),
  )
  .add(
    'lastPublished before today and firstPublished same day as lastPublished',
    () => (
      <ArticleTimestamp
        firstPublished={threeDaysAgo}
        lastPublished={threeDaysAgo}
      />
    ),
  )
  .add(
    'lastPublished before today, !==firstPublished day and firstPublished before today',
    () => (
      <ArticleTimestamp
        firstPublished={threeDaysAgo}
        lastPublished={twoDaysAgo}
      />
    ),
  )
  .add(
    'lastPublished today and > 10 hours and firstPublished before today',
    () => (
      <ArticleTimestamp
        firstPublished={threeDaysAgo}
        lastPublished={elevenHoursAgo}
      />
    ),
  );
