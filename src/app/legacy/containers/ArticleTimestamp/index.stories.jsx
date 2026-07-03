import WithTimeMachine from '../../../../testHelpers/withTimeMachine';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
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

const WrappedArticleTimestamp = ({ ...rest }) => <ArticleTimestamp {...rest} />;

export default {
  Component: WrappedArticleTimestamp,
  title: 'Containers/Article/Article Timestamp',
  decorators: [story => <WithTimeMachine>{story()}</WithTimeMachine>],
  parameters: { chromatic: { disable: true } },
};

export const A = () => (
  <WrappedArticleTimestamp
    firstPublished={threeHoursAgo}
    lastPublished={threeHoursAgo}
  />
);
A.storyName =
  'lastPublished === firstPublished and firstPublished < 10 hours ago';

export const B = () => (
  <WrappedArticleTimestamp
    firstPublished={elevenHoursAgo}
    lastPublished={elevenHoursAgo}
  />
);
B.storyName =
  'lastPublished === firstPublished and firstPublished today and > 10 hours ago';

export const C = () => (
  <WrappedArticleTimestamp
    firstPublished={twentyFourHoursAgo}
    lastPublished={twentyFourHoursAgo}
  />
);
C.storyName =
  'lastPublished === firstPublished and firstPublished before today';

export const D = () => (
  <WrappedArticleTimestamp
    firstPublished={fiveHoursAgo}
    lastPublished={threeHoursAgo}
  />
);
D.storyName =
  'lastPublished today < 10 hours ago and firstPublished today < 10 hours ago';

export const E = () => (
  <WrappedArticleTimestamp
    firstPublished={twelveHoursAgo}
    lastPublished={elevenHoursAgo}
  />
);
E.storyName =
  'lastPublished today more than 10 hours ago and firstPublished today more than 10 hours ago';

export const F = () => (
  <WrappedArticleTimestamp
    firstPublished={threeDaysAgo}
    lastPublished={threeDaysAgo}
  />
);
F.storyName =
  'lastPublished before today and firstPublished same day as lastPublished';

export const G = () => (
  <WrappedArticleTimestamp
    firstPublished={threeDaysAgo}
    lastPublished={twoDaysAgo}
  />
);
G.storyName =
  'lastPublished before today, !==firstPublished day and firstPublished before today';

export const H = () => (
  <WrappedArticleTimestamp
    firstPublished={threeDaysAgo}
    lastPublished={elevenHoursAgo}
  />
);
H.storyName =
  'lastPublished today and more than 10 hours ago and firstPublished before today';

// Timezone and locale migration checks for Moment → Temporal
const timezoneLocaleServices = [
  { service: 'news', label: 'English (Europe/London)' },
  { service: 'azeri', label: 'Azeri (Asia/Baku)' },
  { service: 'arabic', label: 'Arabic (GMT)' },
  { service: 'portuguese', label: 'Portuguese (America/Sao_Paulo)' },
  { service: 'nepali', label: 'Nepali (Asia/Kathmandu)' },
];

const dstBoundaryTimestamp = Date.UTC(2021, 2, 28, 1, 0, 0); // 28 March 2021 01:00 UTC (DST boundary)
const fixedOlderTimestamp = Date.UTC(2021, 2, 27, 12, 0, 0); // 27 March 2021 12:00 UTC

export const TimezoneAndLocaleMigrationChecks = () => (
  <div>
    {timezoneLocaleServices.map(({ service, label }) => (
      <ServiceContextProvider key={service} service={service}>
        <div
          style={{
            marginBottom: '2rem',
            padding: '1rem',
            border: '1px solid #ccc',
          }}
        >
          <strong>{label}</strong>
          <div style={{ marginTop: '0.5rem' }}>
            <ArticleTimestamp
              firstPublished={fixedOlderTimestamp}
              lastPublished={dstBoundaryTimestamp}
            />
          </div>
        </div>
      </ServiceContextProvider>
    ))}
  </div>
);
TimezoneAndLocaleMigrationChecks.storyName =
  'Timezone and Locale Migration Checks (Pre-Temporal)';
TimezoneAndLocaleMigrationChecks.parameters = {
  chromatic: {
    disable: false,
  },
};
