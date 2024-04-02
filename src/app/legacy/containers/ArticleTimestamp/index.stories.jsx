import React from 'react';
import withServicesDecorator from '#storybook/withServicesDecorator';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import WithTimeMachine from '../../../../testHelpers/withTimeMachine';
import ArticleTimestamp from '.';
import { timestampGenerator } from './testHelpers';

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

export default {
  Component: WrappedArticleTimestamp,
  title: 'Containers/Article/Article Timestamp',
  decorators: [
    withServicesDecorator,
    story => <WithTimeMachine>{story()}</WithTimeMachine>,
  ],
  parameters: { chromatic: { disable: true } },
};

export const A = (_, globalArgs) => (
  <WrappedArticleTimestamp
    firstPublished={threeHoursAgo}
    lastPublished={threeHoursAgo}
    {...globalArgs}
  />
);
A.storyName =
  'lastPublished === firstPublished and firstPublished < 10 hours ago';

export const B = (_, globalArgs) => (
  <WrappedArticleTimestamp
    firstPublished={elevenHoursAgo}
    lastPublished={elevenHoursAgo}
    {...globalArgs}
  />
);
B.storyName =
  'lastPublished === firstPublished and firstPublished today and > 10 hours ago';

export const C = (_, globalArgs) => (
  <WrappedArticleTimestamp
    firstPublished={twentyFourHoursAgo}
    lastPublished={twentyFourHoursAgo}
    {...globalArgs}
  />
);
C.storyName =
  'lastPublished === firstPublished and firstPublished before today';

export const D = (_, globalArgs) => (
  <WrappedArticleTimestamp
    firstPublished={fiveHoursAgo}
    lastPublished={threeHoursAgo}
    {...globalArgs}
  />
);
D.storyName =
  'lastPublished today < 10 hours ago and firstPublished today < 10 hours ago';

export const E = (_, globalArgs) => (
  <WrappedArticleTimestamp
    firstPublished={twelveHoursAgo}
    lastPublished={elevenHoursAgo}
    {...globalArgs}
  />
);
E.storyName =
  'lastPublished today more than 10 hours ago and firstPublished today more than 10 hours ago';

export const F = (_, globalArgs) => (
  <WrappedArticleTimestamp
    firstPublished={threeDaysAgo}
    lastPublished={threeDaysAgo}
    {...globalArgs}
  />
);
F.storyName =
  'lastPublished before today and firstPublished same day as lastPublished';

export const G = (_, globalArgs) => (
  <WrappedArticleTimestamp
    firstPublished={threeDaysAgo}
    lastPublished={twoDaysAgo}
    {...globalArgs}
  />
);
G.storyName =
  'lastPublished before today, !==firstPublished day and firstPublished before today';

export const H = (_, globalArgs) => (
  <WrappedArticleTimestamp
    firstPublished={threeDaysAgo}
    lastPublished={elevenHoursAgo}
    {...globalArgs}
  />
);
H.storyName =
  'lastPublished today and more than 10 hours ago and firstPublished before today';
