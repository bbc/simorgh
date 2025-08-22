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
import {
  formatDate,
  formatDateAndTime,
} from '../../../containers/ArticleTimestamp/timeFormats';

import notes from '../README.md';

const timeFunctions = [];

const formatDateAltCalendar = ({ date, altCalendar, format }) => {
  return `${altCalendar.formatDate(date)} - ${date.format(format)}`;
};

const fixedTimestamp = '2019-08-27T13:54:21.212Z';
const fixedDate = moment(fixedTimestamp);

timeFunctions.push({ heading: 'Common Timestamp Formats' });

timeFunctions.push(
  ...[
    {
      subheading: `Exact Date - ${new Intl.DateTimeFormat('en-gb', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(fixedDate)}`,
    },
    (locale, altCalendar) => {
      const format = formatDate(locale);
      const date = fixedDate.locale(locale);
      return altCalendar
        ? formatDateAltCalendar({ date, altCalendar, format })
        : date.format(format);
    },
    timeFunctions.push({ heading: '' }),
    {
      subheading: `Exact Date and Time with Timezone - ${new Intl.DateTimeFormat(
        'en-GB',
        {
          dateStyle: 'long',
          timeStyle: 'long',
        }
      ).format(fixedDate)}`,
    },
    (locale, altCalendar, timezone = 'GMT') => {
      const format = formatDateAndTime(locale);
      const date = moment(new Date(fixedTimestamp), timezone).locale(locale);
      return altCalendar
        ? formatDateAltCalendar({ date, altCalendar, format })
        : date.format(format);
    },
  ]
);

timeFunctions.push({ heading: 'Days of the Week' });

Array.from({ length: 7 }, (_, index) => index).forEach((day) => {
  timeFunctions.push((locale) =>
    moment('20240101').locale(locale).add(day, 'days').format('dddd')
  );
});

timeFunctions.push({ heading: ' Days of the Week (Abbreviated)' });

Array.from({ length: 7 }, (_, index) => index).forEach((day) => {
  timeFunctions.push((locale) =>
    moment('20240101').locale(locale).add(day, 'days').format('ddd')
  );
});

timeFunctions.push({ heading: 'Months' });

Array.from({ length: 12 }, (_, index) => index).forEach((month) => {
  timeFunctions.push((locale) =>
    moment('20240101').locale(locale).add(month, 'months').format('MMMM')
  );
});
timeFunctions.push({ heading: 'Months (Abbreviated)' });

Array.from({ length: 12 }, (_, index) => index).forEach((month) => {
  timeFunctions.push((locale) =>
    moment('20240101').locale(locale).add(month, 'months').format('MMM')
  );
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

timeFunctions.push({
  heading: `Years (±5 from ${currentYear})`,
});

years.forEach((year) => {
  timeFunctions.push((locale) =>
    moment(`${year}0101`).locale(locale).format('YYYY')
  );
});

timeFunctions.push({
  heading: `Alternative Calendar Years (±5 from ${currentYear})`,
});
years.forEach((year) => {
  timeFunctions.push((locale, altCalendar) => {
    const lastYear = moment(`${year}0101`).locale(locale);
    const thisYear = moment(`${year}0601`).locale(locale);
    return altCalendar
      ? `${altCalendar.formatDate(lastYear).split(' ')[2]} - ${altCalendar.formatDate(thisYear).split(' ')[2]}`
      : thisYear.format('YYYY');
  });
});

timeFunctions.push({
  heading: 'Numerals',
});

Array.from({ length: 31 }, (_, index) => index).forEach((day) => {
  timeFunctions.push((locale) =>
    moment('20240101').locale(locale).add(day, 'days').format('D')
  );
});

timeFunctions.push({
  heading: 'Ordinal Numerals',
});
Array.from({ length: 31 }, (_, index) => index).forEach((day) => {
  timeFunctions.push((locale) =>
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

const Component = ({
  service,
  variant,
  dir,
  locale,
  altCalendar,
  timezone,
}) => {
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
                  <td dir={dir}>{timeFunction('en-gb')}</td>
                  <td dir={dir}>
                    {timeFunction(locale, altCalendar, timezone)}
                  </td>
                </tr>
              );
            } else {
              const { heading, subheading } = timeFunction;
              return (
                <tr key={index}>
                  <b>{subheading}</b>
                  <b>
                    <br />
                    <u>{heading}</u>
                  </b>
                </tr>
              );
            }
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
  const { dir, datetimeLocale, altCalendar, timezone } = use(ServiceContext);

  return (
    <Component
      service={service}
      variant={variant}
      dir={dir}
      locale={datetimeLocale}
      altCalendar={altCalendar}
      timezone={timezone}
    />
  );
};
