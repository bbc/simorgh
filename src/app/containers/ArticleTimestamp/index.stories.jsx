import React from 'react';
import { storiesOf } from '@storybook/react';
import WithTimeMachine from '../../../testHelpers/withTimeMachine';
import ArticleTimestamp from '.';
import { timestampGenerator } from './testHelpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import services from '#server/utilities/serviceConfigs';

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

// eslint-disable-next-line react/prop-types
const WrappedArticleTimestamp = ({ service, ...rest }) => (
  <ServiceContextProvider service={service || 'news'}>
    <ArticleTimestamp {...rest} />
  </ServiceContextProvider>
);

const stories = storiesOf('Containers|Article/Article Timestamp', module)
  .addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>)
  .addParameters({ chromatic: { disable: true } });

stories.add('default', () => (
  <WrappedArticleTimestamp
    firstPublished={1530947227000}
    lastPublished={1552666749637}
  />
));

Object.keys(services)
  .filter(service => service !== 'default')
  .forEach(service => {
    stories.add(service, () => (
      <WrappedArticleTimestamp
        firstPublished={1530947227000}
        lastPublished={1552666749637}
        service={service}
      />
    ));
  });

stories
  .add(
    'lastPublished === firstPublished and firstPublished < 10 hours ago',
    () => (
      <WrappedArticleTimestamp
        firstPublished={threeHoursAgo}
        lastPublished={threeHoursAgo}
      />
    ),
  )
  .add(
    'lastPublished === firstPublished and firstPublished today and > 10 hours ago',
    () => (
      <WrappedArticleTimestamp
        firstPublished={elevenHoursAgo}
        lastPublished={elevenHoursAgo}
      />
    ),
  )
  .add(
    'lastPublished === firstPublished and firstPublished before today',
    () => (
      <WrappedArticleTimestamp
        firstPublished={twentyFourHoursAgo}
        lastPublished={twentyFourHoursAgo}
      />
    ),
  )
  .add(
    'lastPublished today < 10 hours ago and firstPublished today < 10 hours ago',
    () => (
      <WrappedArticleTimestamp
        firstPublished={fiveHoursAgo}
        lastPublished={threeHoursAgo}
      />
    ),
  )
  .add(
    'lastPublished today more than 10 hours ago and firstPublished today more than 10 hours ago',
    () => (
      <WrappedArticleTimestamp
        firstPublished={twelveHoursAgo}
        lastPublished={elevenHoursAgo}
      />
    ),
  )
  .add(
    'lastPublished before today and firstPublished same day as lastPublished',
    () => (
      <WrappedArticleTimestamp
        firstPublished={threeDaysAgo}
        lastPublished={threeDaysAgo}
      />
    ),
  )
  .add(
    'lastPublished before today, !==firstPublished day and firstPublished before today',
    () => (
      <WrappedArticleTimestamp
        firstPublished={threeDaysAgo}
        lastPublished={twoDaysAgo}
      />
    ),
  )
  .add(
    'lastPublished today and more than 10 hours ago and firstPublished before today',
    () => (
      <WrappedArticleTimestamp
        firstPublished={threeDaysAgo}
        lastPublished={elevenHoursAgo}
      />
    ),
  );
