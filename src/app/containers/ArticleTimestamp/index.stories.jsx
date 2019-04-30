import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import ArticleTimestamp from '.';
import { timestampGenerator } from '../Timestamp/helpers/testHelpers';

const fiveHoursAgo = timestampGenerator({
  hours: 5,
});

storiesOf('ArticleTimestamp', module)
  .add('default', () => (
    <ArticleTimestamp
      firstPublished={1530947227000}
      lastPublished={1552666749637}
    />
  ))
  .add('lastPublished isToday', () => (
    <ArticleTimestamp
      firstPublished={1552666749637}
      lastPublished={Date.now()}
    />
  ))
  .add('firstPublished === lastPublished', () => (
    <ArticleTimestamp firstPublished={Date.now()} lastPublished={Date.now()} />
  ))
  .add('firstPublished date & time, lastPublished relative', () => (
    <ArticleTimestamp
      firstPublished={fiveHoursAgo}
      lastPublished={Date.now()}
    />
  ));
