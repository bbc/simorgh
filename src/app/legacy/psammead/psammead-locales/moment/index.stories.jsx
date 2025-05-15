import React, { useContext } from 'react';
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

const emptyRow = () => {};

const timeFunctions = [];

// Add Months of the Year to the list of functions
timeFunctions.push(() => ' Months ');
timeFunctions.push(emptyRow);

Array.from({ length: 12 }, (_, index) => index).forEach((month) => {
  timeFunctions.push((locale) =>
    moment('20200101').locale(locale).add(month, 'months').format('MMMM')
  );
});
timeFunctions.push(emptyRow);

timeFunctions.push(() => ' Common Timestamp Formats ');
timeFunctions.push(emptyRow);

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
    emptyRow,
    () => ' Other Timestamp Formats ',
    emptyRow,
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

timeFunctions.push(emptyRow);
timeFunctions.push(() => ' Months (Abbreviated) ');
timeFunctions.push(emptyRow);

Array.from({ length: 12 }, (_, index) => index).forEach((month) => {
  timeFunctions.push((locale) =>
    moment('20200101').locale(locale).add(month, 'months').format('MMM')
  );
});
timeFunctions.push(emptyRow);

// Add Days of Week
timeFunctions.push(() => ' Days of the Week ');
timeFunctions.push(emptyRow);

Array.from({ length: 7 }, (_, index) => index).forEach((day) => {
  timeFunctions.push((locale) =>
    moment('20200106').locale(locale).add(day, 'days').format('dddd')
  );
});
timeFunctions.push(emptyRow);

timeFunctions.push(() => ' Days of the Week (Abbreviated)');
timeFunctions.push(emptyRow);

Array.from({ length: 7 }, (_, index) => index).forEach((day) => {
  timeFunctions.push((locale) =>
    moment('20200106').locale(locale).add(day, 'days').format('ddd')
  );
});
timeFunctions.push(emptyRow);

// Add Numerals
timeFunctions.push(() => ' Numerals ');
timeFunctions.push(emptyRow);

Array.from({ length: 31 }, (_, index) => index).forEach((day) => {
  timeFunctions.push((locale) =>
    moment('20200101').locale(locale).add(day, 'days').format('Do')
  );
});
timeFunctions.push(emptyRow);

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
          {timeFunctions.map((timeFunction, index) => (
            <tr key={index}>
              <td dir={dir}>{timeFunction('en-gb')}</td>
              <td dir={dir}>{timeFunction(locale)}</td>
            </tr>
          ))}
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
  const { dir, datetimeLocale } = useContext(ServiceContext);

  return (
    <Component
      service={service}
      variant={variant}
      dir={dir}
      locale={datetimeLocale}
    />
  );
};
