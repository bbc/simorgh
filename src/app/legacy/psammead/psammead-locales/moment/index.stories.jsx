import React, { use } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  ServiceContext,
  ServiceContextProvider,
} from '#app/contexts/ServiceContext';
import services from '#src/server/utilities/serviceConfigs';
import PromoTimestamp from '#components/Promo/timestamp';
import ArticleTimestamp from '#containers/ArticleTimestamp';
import MostReadTimestamp from '#src/app/components/MostRead/Canonical/LastUpdated';

import notes from '../README.md';
import WithTimeMachine from '#src/testHelpers/withTimeMachine';
import { REITH_SANS } from '../../../../components/ThemeProvider/fontFamilies';

const ws = services.ws.default;

const timeFunctions = [];

const originalNow = moment.now;

const WithService = ({ service, variant, children }) => (
  <ServiceContextProvider service={service} variant={variant}>
    {children}
  </ServiceContextProvider>
);

const fixedTimestamp = '2025-08-27T13:54:21.212Z';
const fixedDate = moment(fixedTimestamp);
const exactDate = new Intl.DateTimeFormat('en-gb', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(fixedDate);

timeFunctions.push({
  heading: `Common Timestamp Formats for ${exactDate} (${fixedDate})`,
});

timeFunctions.push(
  ...[
    { heading: '' },
    {
      subheading: `Article Timestamp: First and last published on the same day`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);
      date.setDate(date.getDate() - 1);
      const firstPublished = new Date(date);
      const lastPublished = new Date(firstPublished);

      return (
        <WithService service={service} variant={variant}>
          <ArticleTimestamp
            firstPublished={firstPublished}
            lastPublished={lastPublished}
          />
        </WithService>
      );
    },
    {
      subheading: `Article Timestamp: First and last published on different days`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);
      const dayBefore = new Date(date).setDate(date.getDate() - 1);
      const lastPublished = new Date(date);

      return (
        <WithService service={service} variant={variant}>
          <ArticleTimestamp
            firstPublished={dayBefore}
            lastPublished={lastPublished}
          />
        </WithService>
      );
    },
    {
      subheading: `Article Timestamp: First and last published at same time, within the last 10 hours`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);

      const firstPublished = new Date(date);
      const lastPublished = new Date(firstPublished);

      return (
        <WithService service={service} variant={variant}>
          <WithTimeMachine
            dateString={date.toDateString()}
            timestamp={date.getTime()}
          >
            <ArticleTimestamp
              firstPublished={firstPublished}
              lastPublished={lastPublished}
            />
          </WithTimeMachine>
        </WithService>
      );
    },
    {
      subheading: `Article Timestamp: First and last published at different times within the last 10 hours, last updated 1 minute ago`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);
      const elevenHoursAgo = new Date(date);
      elevenHoursAgo.setHours(elevenHoursAgo.getHours() - 11);

      const firstPublished = new Date(elevenHoursAgo);

      const lastPublished = new Date(date);
      lastPublished.setMinutes(lastPublished.getMinutes() - 1);

      moment.now = () => date;

      return (
        <WithService service={service} variant={variant}>
          <WithTimeMachine
            dateString={date.toDateString()}
            timestamp={date.getTime()}
          >
            <ArticleTimestamp
              firstPublished={firstPublished}
              lastPublished={lastPublished}
            />
          </WithTimeMachine>
        </WithService>
      );
    },
    {
      subheading: `Article Timestamp: First and last published at different times within the last 10 hours, last updated 5 minutes ago`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);
      const elevenHoursAgo = new Date(date);
      elevenHoursAgo.setHours(elevenHoursAgo.getHours() - 11);

      const firstPublished = new Date(elevenHoursAgo);

      const lastPublished = new Date(date);
      lastPublished.setMinutes(lastPublished.getMinutes() - 5);

      moment.now = () => date;

      return (
        <WithService service={service} variant={variant}>
          <WithTimeMachine
            dateString={date.toDateString()}
            timestamp={date.getTime()}
          >
            <ArticleTimestamp
              firstPublished={firstPublished}
              lastPublished={lastPublished}
            />
          </WithTimeMachine>
        </WithService>
      );
    },
    {
      subheading: `Article Timestamp: First and last published at different times within the last 10 hours, last updated 1 hour ago`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);
      const elevenHoursAgo = new Date(date);
      elevenHoursAgo.setHours(elevenHoursAgo.getHours() - 11);

      const firstPublished = new Date(elevenHoursAgo);

      const lastPublished = new Date(date);
      lastPublished.setHours(lastPublished.getHours() - 1);

      moment.now = () => date;

      return (
        <WithService service={service} variant={variant}>
          <WithTimeMachine
            dateString={date.toDateString()}
            timestamp={date.getTime()}
          >
            <ArticleTimestamp
              firstPublished={firstPublished}
              lastPublished={lastPublished}
            />
          </WithTimeMachine>
        </WithService>
      );
    },
    {
      subheading: `First and last published at different times within the last 10 hours, last updated 5 hours ago`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);
      const elevenHoursAgo = new Date(date);
      elevenHoursAgo.setHours(elevenHoursAgo.getHours() - 11);

      const firstPublished = new Date(elevenHoursAgo);

      const lastPublished = new Date(date);
      lastPublished.setHours(lastPublished.getHours() - 5);

      moment.now = () => date;

      return (
        <WithService service={service} variant={variant}>
          <WithTimeMachine
            dateString={date.toDateString()}
            timestamp={date.getTime()}
          >
            <ArticleTimestamp
              firstPublished={firstPublished}
              lastPublished={lastPublished}
            />
          </WithTimeMachine>
        </WithService>
      );
    },
    { heading: '' },
    {
      subheading: `Most Read Timestamp: article more than 60 days old`,
    },
    ({ service, variant }) => {
      const { articleTimestampPrefix, script, locale, timezone } =
        use(ServiceContext);

      return (
        <WithService service={service} variant={variant}>
          <MostReadTimestamp
            prefix={articleTimestampPrefix}
            timestamp={new Date(fixedTimestamp)}
            locale={locale}
            timezone={timezone}
          />
        </WithService>
      );
    },
    { heading: '' },
    {
      subheading: `Promo Timestamp`,
    },
    ({ service, variant }) => {
      return (
        <WithService service={service} variant={variant}>
          <PromoTimestamp>{new Date(fixedTimestamp)}</PromoTimestamp>
        </WithService>
      );
    },
    {
      subheading: `Promo Timestamp: 1 minute ago`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);
      const promoDate = new Date(fixedTimestamp);
      promoDate.setMinutes(promoDate.getMinutes() - 1);

      return (
        <WithService service={service} variant={variant}>
          <WithTimeMachine
            dateString={date.toDateString()}
            timestamp={date.getTime()}
          >
            <PromoTimestamp>{promoDate}</PromoTimestamp>
          </WithTimeMachine>
        </WithService>
      );
    },
    {
      subheading: `Promo Timestamp: 5 minutes ago`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);
      const promoDate = new Date(fixedTimestamp);
      promoDate.setMinutes(promoDate.getMinutes() - 5);

      return (
        <WithService service={service} variant={variant}>
          <WithTimeMachine
            dateString={date.toDateString()}
            timestamp={date.getTime()}
          >
            <PromoTimestamp>{promoDate}</PromoTimestamp>
          </WithTimeMachine>
        </WithService>
      );
    },
    {
      subheading: `Promo Timestamp: 1 hour ago`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);
      const promoDate = new Date(fixedTimestamp);
      promoDate.setHours(promoDate.getHours() - 1);

      return (
        <WithService service={service} variant={variant}>
          <WithTimeMachine
            dateString={date.toDateString()}
            timestamp={date.getTime()}
          >
            <PromoTimestamp>{promoDate}</PromoTimestamp>
          </WithTimeMachine>
        </WithService>
      );
    },
    {
      subheading: `Promo Timestamp: 5 hours ago`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);
      const promoDate = new Date(fixedTimestamp);
      promoDate.setHours(promoDate.getHours() - 5);

      return (
        <WithService service={service} variant={variant}>
          <WithTimeMachine
            dateString={date.toDateString()}
            timestamp={date.getTime()}
          >
            <PromoTimestamp>{promoDate}</PromoTimestamp>
          </WithTimeMachine>
        </WithService>
      );
    },
  ]
);

timeFunctions.push({ heading: '' });
timeFunctions.push({
  heading: 'Other',
});
timeFunctions.push({ subheading: 'Days of the Week' });

Array.from({ length: 7 }, (_, index) => index).forEach((day) => {
  timeFunctions.push(({ locale }) =>
    moment('20240101').locale(locale).add(day, 'days').format('dddd')
  );
});

timeFunctions.push({ subheading: ' Days of the Week (Abbreviated)' });

Array.from({ length: 7 }, (_, index) => index).forEach((day) => {
  timeFunctions.push(({ locale }) =>
    moment('20240101').locale(locale).add(day, 'days').format('ddd')
  );
});

timeFunctions.push({ subheading: 'Months' });

Array.from({ length: 12 }, (_, index) => index).forEach((month) => {
  timeFunctions.push(({ locale }) =>
    moment('20240101').locale(locale).add(month, 'months').format('MMMM')
  );
});
timeFunctions.push({ subheading: 'Months (Abbreviated)' });

Array.from({ length: 12 }, (_, index) => index).forEach((month) => {
  timeFunctions.push(({ locale }) =>
    moment('20240101').locale(locale).add(month, 'months').format('MMM')
  );
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

timeFunctions.push({
  subheading: `Years (±5 from ${currentYear})`,
});

years.forEach((year) => {
  timeFunctions.push(({ locale, altCalendar }) => {
    const formattedYear = moment(`${year}0101`).locale(locale).format('YYYY');

    const lastYear = moment(`${year}0101`).locale(locale);
    const thisYear = moment(`${year}0601`).locale(locale);
    return altCalendar
      ? `${formattedYear} - ${altCalendar.formatDate(lastYear).split(' ')[2]} - ${altCalendar.formatDate(thisYear).split(' ')[2]}`
      : thisYear.format('YYYY');
  });
});

timeFunctions.push({
  subheading: 'Numerals',
});

Array.from({ length: 31 }, (_, index) => index).forEach((day) => {
  timeFunctions.push(({ locale }) =>
    moment('20240101').locale(locale).add(day, 'days').format('D')
  );
});

timeFunctions.push({
  subheading: 'Ordinal Numerals',
});
Array.from({ length: 31 }, (_, index) => index).forEach((day) => {
  timeFunctions.push(({ locale }) =>
    moment('20240101').locale(locale).add(day, 'days').format('Do')
  );
});

const Table = styled.table`
  margin: ${GEL_SPACING_DBL};
  border: 1px solid ${(props) => props.theme.palette.PEBBLE};
  font-family: ${REITH_SANS};

  & td,
  th {
    padding: ${GEL_SPACING_HLF} ${GEL_SPACING};
    border: 1px solid ${(props) => props.theme.palette.PEBBLE};
  }
`;

const Paragraph = styled.p`
  font-family: ${REITH_SANS};
  margin: ${GEL_SPACING_DBL};
`;

const issueHref = (localeName) =>
  `https://github.com/bbc/simorgh/issues/new?labels=bug&title=Moment+translation+correction+for+${localeName}`;

const Component = ({ service, variant, dir, locale }) => {
  moment.now = originalNow;

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th>English</th>
            <th>
              {service} {variant !== 'default' && variant} ({locale})
            </th>
          </tr>
          {timeFunctions.map((timeFunction, index) => {
            if (typeof timeFunction === 'function') {
              return (
                <tr key={index}>
                  <td dir={dir}>
                    {timeFunction({
                      service: 'ws',
                      variant: 'default',
                      locale: 'en-gb',
                      altCalendar: ws.altCalendar,
                      timezone: ws.timezone,
                      articleTimestampPrefix: ws.articleTimestampPrefix,
                      articleTimestampSuffix: ws.articleTimestampSuffix,
                    })}
                  </td>
                  <td dir={dir}>
                    {timeFunction({
                      service,
                      variant,
                      locale,
                    })}
                  </td>
                </tr>
              );
            }

            const { heading, subheading } = timeFunction;

            return (
              <tr key={index}>
                <td colSpan={2}>
                  {heading && (
                    <span style={{ fontStyle: 'italic', fontWeight: 'bolder' }}>
                      {heading}
                    </span>
                  )}
                  {subheading && (
                    <span style={{ fontWeight: 'bold' }}>{subheading}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Paragraph>
        Spot an incorrect translation? Please write us a{' '}
        <a href={issueHref(service)}>github issue</a> so we can fix it!
      </Paragraph>
    </>
  );
};

export default {
  title: 'Translations/Timestamps',
  Component,
  parameters: {
    chromatic: {
      disable: true,
    },
    docs: { notes },
  },
};

export const Example = (_, { service, variant }) => {
  const {
    dir,
    datetimeLocale,
    altCalendar,
    timezone,
    articleTimestampPrefix,
    articleTimestampSuffix,
  } = use(ServiceContext);

  return (
    <Component
      service={service}
      variant={variant}
      dir={dir}
      locale={datetimeLocale}
      altCalendar={altCalendar}
      timezone={timezone}
      articleTimestampPrefix={articleTimestampPrefix}
      articleTimestampSuffix={articleTimestampSuffix}
    />
  );
};
