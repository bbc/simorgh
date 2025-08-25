import React, { use } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import { GEL_FF_REITH_SANS } from '#psammead/gel-foundations/src/typography';
import { ServiceContext } from '#app/contexts/ServiceContext';
import services from '../../../../../../src/server/utilities/serviceConfigs';
import PromoTimestamp from '../../../components/Promo/timestamp';
import ArticleTimestamp from '../../../containers/ArticleTimestamp';
import MostReadTimestamp from '../../../../components/MostRead/Canonical/LastUpdated';

import notes from '../README.md';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import WithTimeMachine from '../../../../../testHelpers/withTimeMachine';

const ws = services.ws.default;

const timeFunctions = [];

const formatDateAltCalendar = ({ date, altCalendar, format }) => {
  if (altCalendar) {
    return `${altCalendar.formatDate(date)} - ${date.format(format)}`;
  }
  return date.format(format);
};

const WithService = ({ service, variant, children }) => (
  <ServiceContextProvider service={service} variant={variant}>
    {children}
  </ServiceContextProvider>
);

const fixedTimestamp = '2019-08-27T13:54:21.212Z';
const fixedDate = moment(fixedTimestamp);
const exactDate = new Intl.DateTimeFormat('en-gb', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(fixedDate);

timeFunctions.push({ heading: `Common Timestamp Formats for ${exactDate}` });

timeFunctions.push(
  ...[
    { heading: '' },
    {
      subheading: `Promo Timestamp (D MMMM YYYY)`,
    },
    ({ service, variant }) => {
      return (
        <WithService service={service} variant={variant}>
          <PromoTimestamp>{fixedTimestamp}</PromoTimestamp>
        </WithService>
      );
    },
    { heading: '' },
    {
      subheading: `Article first and last published on the same day (D MMMM YYYY)`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);

      return (
        <WithService service={service} variant={variant}>
          <ArticleTimestamp firstPublished={date} lastPublished={date} />
        </WithService>
      );
    },
    {
      subheading: `Article first and last published on different days (D MMMM YYYY)`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);

      return (
        <WithService service={service} variant={variant}>
          <ArticleTimestamp
            firstPublished={new Date(date).setDate(date.getDate() - 1)}
            lastPublished={date}
            minutesTolerance={1}
          />
        </WithService>
      );
    },
    { heading: '' },
    {
      subheading: `Article first and last published at different times on the same day, more than 10 hours ago`,
    },
    ({ service, variant }) => {
      const date = new Date(fixedTimestamp);
      const firstPublished = new Date(date);
      firstPublished.setHours(firstPublished.getHours() - 2);

      const lastPublished = new Date(date);
      lastPublished.setHours(lastPublished.getHours() - 1);

      return (
        <WithTimeMachine
          dateString={lastPublished.toDateString()}
          timestamp={lastPublished.getTime()}
        >
          <WithService service={service} variant={variant}>
            <ArticleTimestamp
              firstPublished={firstPublished}
              lastPublished={lastPublished}
              minutesTolerance={1}
            />
          </WithService>
        </WithTimeMachine>
      );
    },
    { heading: '' },
    {
      subheading: `Most Read, article more than 60 days old (D MMMM YYYY)`,
    },
    ({ service, variant }) => {
      const { articleTimestampPrefix, script, locale, timezone } =
        use(ServiceContext);

      return (
        <WithService service={service} variant={variant}>
          <MostReadTimestamp
            prefix={articleTimestampPrefix}
            script={script}
            service={service}
            timestamp={fixedTimestamp}
            locale={locale}
            timezone={timezone}
          />
        </WithService>
      );
    },
  ]
);

timeFunctions.push({ heading: 'Days of the Week' });

Array.from({ length: 7 }, (_, index) => index).forEach((day) => {
  timeFunctions.push(({ locale }) =>
    moment('20240101').locale(locale).add(day, 'days').format('dddd')
  );
});

timeFunctions.push({ heading: ' Days of the Week (Abbreviated)' });

Array.from({ length: 7 }, (_, index) => index).forEach((day) => {
  timeFunctions.push(({ locale }) =>
    moment('20240101').locale(locale).add(day, 'days').format('ddd')
  );
});

timeFunctions.push({ heading: 'Months' });

Array.from({ length: 12 }, (_, index) => index).forEach((month) => {
  timeFunctions.push(({ locale }) =>
    moment('20240101').locale(locale).add(month, 'months').format('MMMM')
  );
});
timeFunctions.push({ heading: 'Months (Abbreviated)' });

Array.from({ length: 12 }, (_, index) => index).forEach((month) => {
  timeFunctions.push(({ locale }) =>
    moment('20240101').locale(locale).add(month, 'months').format('MMM')
  );
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

timeFunctions.push({
  heading: `Years (±5 from ${currentYear})`,
});

years.forEach((year) => {
  timeFunctions.push(({ locale, altCalendar }) => {
    const formattedYear = moment(`${year}0101`).locale(locale).format('YYYY');

    const lastYear = moment(`${year}0101`).locale(locale);
    const thisYear = moment(`${year}0601`).locale(locale);
    return altCalendar
      ? `${formattedYear} - ${altCalendar.formatDate(lastYear).split(' ')[2]} - ${altCalendar.formatDate(thisYear).split(' ')[2]}`
      : thisYear.format('YYYY');

    return formattedYear;
  });
});

timeFunctions.push({
  heading: 'Numerals',
});

Array.from({ length: 31 }, (_, index) => index).forEach((day) => {
  timeFunctions.push(({ locale }) =>
    moment('20240101').locale(locale).add(day, 'days').format('D')
  );
});

timeFunctions.push({
  heading: 'Ordinal Numerals',
});
Array.from({ length: 31 }, (_, index) => index).forEach((day) => {
  timeFunctions.push(({ locale }) =>
    moment('20240101').locale(locale).add(day, 'days').format('Do')
  );
});

const Table = styled.table`
  margin: ${GEL_SPACING_DBL};
  border: 1px solid ${(props) => props.theme.palette.PEBBLE};
  font-family: ${GEL_FF_REITH_SANS};

  & td,
  th {
    padding: ${GEL_SPACING_HLF} ${GEL_SPACING};
    border: 1px solid ${(props) => props.theme.palette.PEBBLE};
  }
`;

const Paragraph = styled.p`
  font-family: ${GEL_FF_REITH_SANS};
  margin: ${GEL_SPACING_DBL};
`;

const issueHref = (localeName) =>
  `https://github.com/bbc/simorgh/issues/new?labels=bug&title=Moment+translation+correction+for+${localeName}`;

const Component = ({ service, variant, dir, locale }) => {
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

            // if (heading || subheading) {
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
            // }
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

// export const TestArabic = {
//   render: () => (
//     <Component
//       service={arabic.service}
//       variant={arabic.variant}
//       dir={arabic.dir}
//       locale={arabic.datetimeLocale}
//       altCalendar={arabic.altCalendar}
//       timezone={arabic.timezone}
//     />
//   ),
//   // tags: ['!dev'],
// };
