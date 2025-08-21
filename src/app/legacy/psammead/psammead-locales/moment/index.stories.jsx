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

import notes from '../README.md';

const timeFunctions = [];

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

timeFunctions.push({
  heading: 'Years (±5 from current year)',
});

const currentYear = new Date().getFullYear();
Array.from({ length: 11 }, (_, i) => currentYear - 5 + i).forEach((year) => {
  timeFunctions.push((locale) =>
    moment(`${year}0101`).locale(locale).format('YYYY')
  );
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

timeFunctions.push({ heading: 'Common Timestamp Formats' });

// Fixed timestamp for 27 August 2019, 14:54 BST (Tuesday)
const fixedTimestamp = 1566914061212;

timeFunctions.push(
  ...[
    (locale) => moment(fixedTimestamp).locale(locale).format('Do MMM YYYY'),
    (locale) => moment().locale(locale).subtract({ m: 1 }).fromNow(),
    (locale) => moment().locale(locale).subtract({ m: 5 }).fromNow(),
    (locale) =>
      moment(fixedTimestamp)
        .locale(locale)
        .startOf('hour')
        .from(fixedTimestamp),
    (locale) =>
      moment(fixedTimestamp)
        .locale(locale)
        .startOf('day')
        .add(6, 'hours')
        .from(fixedTimestamp),
    (locale) =>
      moment(fixedTimestamp).subtract({ d: 26 }).locale(locale).format('LL'),
    (locale) =>
      moment(fixedTimestamp).subtract({ d: 26 }).locale(locale).format('LLL'),
    (locale) => moment(fixedTimestamp).locale(locale).format('LL'),
    (locale) => moment(fixedTimestamp).locale(locale).format('LLL'),
    {
      heading: 'Other Timestamp Formats',
    },
    (locale) =>
      moment(fixedTimestamp).locale(locale).format('MMMM Do YYYY, h:mm:ss a'),
    (locale) =>
      moment(fixedTimestamp).locale(locale).format('YYYY [escaped text] YYYY'),
    (locale) => moment(fixedTimestamp).locale(locale).format(),
    (locale) =>
      moment('20111031', 'YYYYMMDD').locale(locale).from(fixedTimestamp),
    (locale) =>
      moment('20120620', 'YYYYMMDD').locale(locale).from(fixedTimestamp),
    (locale) =>
      moment(fixedTimestamp).locale(locale).endOf('day').from(fixedTimestamp),
    (locale) =>
      moment(fixedTimestamp)
        .locale(locale)
        .subtract(10, 'days')
        .calendar(fixedTimestamp),
    (locale) =>
      moment(fixedTimestamp)
        .locale(locale)
        .subtract(6, 'days')
        .calendar(fixedTimestamp),
    (locale) =>
      moment(fixedTimestamp)
        .locale(locale)
        .subtract(3, 'days')
        .calendar(fixedTimestamp),
    (locale) =>
      moment(fixedTimestamp)
        .locale(locale)
        .subtract(1, 'days')
        .calendar(fixedTimestamp),
    (locale) => moment(fixedTimestamp).locale(locale).calendar(fixedTimestamp),
    (locale) =>
      moment(fixedTimestamp)
        .locale(locale)
        .add(1, 'days')
        .calendar(fixedTimestamp),
    (locale) =>
      moment(fixedTimestamp)
        .locale(locale)
        .add(3, 'days')
        .calendar(fixedTimestamp),
    (locale) =>
      moment(fixedTimestamp)
        .locale(locale)
        .add(10, 'days')
        .calendar(fixedTimestamp),
    (locale) => moment(fixedTimestamp).locale(locale).format('LT'),
    (locale) => moment(fixedTimestamp).locale(locale).format('LTS'),
    (locale) => moment(fixedTimestamp).locale(locale).format('L'),
    (locale) => moment(fixedTimestamp).locale(locale).format('l'),
    (locale) => moment(fixedTimestamp).locale(locale).format('ll'),
    (locale) => moment(fixedTimestamp).locale(locale).format('lll'),
    (locale) => moment(fixedTimestamp).locale(locale).format('LLLL'),
    (locale) => moment(fixedTimestamp).locale(locale).format('llll'),
  ]
);

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
                  <td dir={dir}>{timeFunction('en-gb')}</td>
                  <td dir={dir}>{timeFunction(locale)}</td>
                </tr>
              );
            } else {
              return (
                <tr key={index}>
                  <b>
                    <br />
                    <u>{timeFunction.heading}</u>
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
  const { dir, datetimeLocale } = use(ServiceContext);

  return (
    <Component
      service={service}
      variant={variant}
      dir={dir}
      locale={datetimeLocale}
    />
  );
};
