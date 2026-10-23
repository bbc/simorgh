import WithTimeMachine from '../../../../testHelpers/withTimeMachine';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import serviceVariants from '#testHelpers/serviceVariants';
import ArticleTimestamp from '.';

const fixedNow = Date.UTC(2025, 5, 15, 18);
const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;

const threeHoursAgo = fixedNow - 3 * oneHour;
const fiveHoursAgo = fixedNow - 5 * oneHour;
const elevenHoursAgo = fixedNow - 11 * oneHour;
const twelveHoursAgo = fixedNow - 12 * oneHour;
const twentyFourHoursAgo = fixedNow - oneDay - 1000;
const twoDaysAgo = fixedNow - 2 * oneDay;
const threeDaysAgo = fixedNow - 3 * oneDay;

const WrappedArticleTimestamp = ({ ...rest }) => <ArticleTimestamp {...rest} />;

const ServiceTimestampMatrix = props => (
  <div>
    {serviceVariants.map(
      ({ service, variant, pageLang, configVariant, label }) => (
        <div key={`${service}-${configVariant}`}>
          <strong>{label}</strong>
          <ServiceContextProvider
            service={service}
            variant={variant}
            pageLang={pageLang}
          >
            <ArticleTimestamp {...props} />
          </ServiceContextProvider>
        </div>
      ),
    )}
  </div>
);

export default {
  Component: WrappedArticleTimestamp,
  title: 'Containers/Article/Article Timestamp',
  decorators: [
    story => (
      <WithTimeMachine
        dateString="Sunday, 15 June 2025 18:00:00 GMT"
        timestamp={fixedNow}
      >
        {story()}
      </WithTimeMachine>
    ),
  ],
};

export const A = () => (
  <ServiceTimestampMatrix
    firstPublished={threeHoursAgo}
    lastPublished={threeHoursAgo}
  />
);
A.storyName =
  'lastPublished === firstPublished and firstPublished < 10 hours ago';
A.tags = ['!dev'];

export const B = () => (
  <ServiceTimestampMatrix
    firstPublished={elevenHoursAgo}
    lastPublished={elevenHoursAgo}
  />
);
B.storyName =
  'lastPublished === firstPublished and firstPublished today and > 10 hours ago';
B.tags = ['!dev'];

export const C = () => (
  <ServiceTimestampMatrix
    firstPublished={twentyFourHoursAgo}
    lastPublished={twentyFourHoursAgo}
  />
);
C.storyName =
  'lastPublished === firstPublished and firstPublished before today';
C.tags = ['!dev'];

export const D = () => (
  <ServiceTimestampMatrix
    firstPublished={fiveHoursAgo}
    lastPublished={threeHoursAgo}
  />
);
D.storyName =
  'lastPublished today < 10 hours ago and firstPublished today < 10 hours ago';
D.tags = ['!dev'];

export const E = () => (
  <ServiceTimestampMatrix
    firstPublished={twelveHoursAgo}
    lastPublished={elevenHoursAgo}
  />
);
E.storyName =
  'lastPublished today more than 10 hours ago and firstPublished today more than 10 hours ago';
E.tags = ['!dev'];

export const F = () => (
  <ServiceTimestampMatrix
    firstPublished={threeDaysAgo}
    lastPublished={threeDaysAgo}
  />
);
F.storyName =
  'lastPublished before today and firstPublished same day as lastPublished';
F.tags = ['!dev'];

export const G = () => (
  <ServiceTimestampMatrix
    firstPublished={threeDaysAgo}
    lastPublished={twoDaysAgo}
  />
);
G.storyName =
  'lastPublished before today, !==firstPublished day and firstPublished before today';
G.tags = ['!dev'];

export const H = () => (
  <ServiceTimestampMatrix
    firstPublished={threeDaysAgo}
    lastPublished={elevenHoursAgo}
  />
);
H.storyName =
  'lastPublished today and more than 10 hours ago and firstPublished before today';
H.tags = ['!dev'];

// Timezone and locale migration checks for Moment → Temporal
const timezoneLocaleServices = [
  { service: 'news', label: 'English (Europe/London)' },
  { service: 'azeri', label: 'Azeri (Asia/Baku)' },
  { service: 'persian', label: 'Persian (GMT, Jalali calendar)' },
  { service: 'arabic', label: 'Arabic (GMT, RTL)' },
  { service: 'portuguese', label: 'Portuguese (America/Sao_Paulo)' },
  { service: 'nepali', label: 'Nepali (Asia/Kathmandu)' },
];

const dstBoundaryTimestamp = Date.UTC(2021, 2, 28, 1, 0, 0); // 28 March 2021 01:00 UTC (DST boundary)
const fixedOlderTimestamp = Date.UTC(2021, 2, 27, 12, 0, 0); // 27 March 2021 12:00 UTC

export const TimezoneAndLocaleChecks = () => (
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
TimezoneAndLocaleChecks.parameters = {
  chromatic: {
    disable: false,
  },
};
TimezoneAndLocaleChecks.tags = ['!dev'];
