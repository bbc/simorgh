import React from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import { GEL_FF_REITH_SANS } from '#psammead/gel-foundations/src/typography';
import WithTimeMachine from '#testHelpers/withTimeMachine';

// ensure all moment locales have been loaded via service configs
import services from '#server/utilities/serviceConfigs';

// always round downwards
// 59 minutes, 59 seconds ago -> 59 minutes ago
// https://momentjs.com/docs/#/customization/relative-time-rounding/
moment.relativeTimeRounding(Math.floor);
// be exact
// https://momentjs.com/docs/#/customization/relative-time-threshold/
moment.relativeTimeThreshold('s', 60);
moment.relativeTimeThreshold('ss', 3);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24);
moment.relativeTimeThreshold('d', 30);
moment.relativeTimeThreshold('M', 12);

// Sunday, 2 January 2000 15:16:17 GMT+00:00
const A_DATE = 946826177000;

const MONDAY = 1563796800000;
const TUESDAY = 1563883200000;
const WEDNESDAY = 1563969600000;
const THURSDAY = 1564056000000;
const FRIDAY = 1564142400000;
const SATURDAY = 1564228800000;
const SUNDAY = 1564315200000;

const JANUARY = 1547510400000;
const FEBRUARY = 1550188800000;
const MARCH = 1552608000000;
const APRIL = 1555286400000;
const MAY = 1557878400000;
const JUNE = 1560556800000;
const JULY = 1563148800000;
const AUGUST = 1565827200000;
const SEPTEMBER = 1568505600000;
const OCTOBER = 1571097600000;
const NOVEMBER = 1573776000000;
const DECEMBER = 1576368000000;
/* eslint-disable prettier/prettier */
const editorialWhitelist = [
  'LL',
  'January',
  'February',
  'March',
  'April',
  'May (long)',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  '1 minute in the past',
  '5 minutes in the past',
  '1 hour in the past',
  '5 hours in the past',
];

const methods = [
  {
    what: '[default format]',
    method: locale => moment(A_DATE).locale(locale).format(),
  },
  {
    what: 'MMM Do YYYY',
    method: locale => moment(A_DATE).locale(locale).format('MMM Do YYYY'),
  },
  {
    what: 'MMMM Do YYYY, h:mm:ss a',
    method: locale =>
      moment(A_DATE).locale(locale).format('MMMM Do YYYY, h:mm:ss a'),
  },
  {
    what: 'YYYY [escaped text] YYYY',
    method: locale =>
      moment(A_DATE).locale(locale).format('YYYY [escaped text] YYYY'),
  },
  {
    what: 'LT',
    method: locale => moment(A_DATE).locale(locale).format('LT'),
  },
  {
    what: 'LTS',
    method: locale => moment(A_DATE).locale(locale).format('LTS'),
  },
  {
    what: 'l',
    method: locale => moment(A_DATE).locale(locale).format('l'),
  },
  {
    what: 'L',
    method: locale => moment(A_DATE).locale(locale).format('L'),
  },
  {
    what: 'll',
    method: locale => moment(A_DATE).locale(locale).format('ll'),
  },
  {
    what: 'LL',
    method: locale => moment(A_DATE).locale(locale).format('LL'),
  },
  {
    what: 'lll',
    method: locale => moment(A_DATE).locale(locale).format('lll'),
  },
  {
    what: 'LLL',
    method: locale => moment(A_DATE).locale(locale).format('LLL'),
  },
  {
    what: 'llll',
    method: locale => moment(A_DATE).locale(locale).format('llll'),
  },
  {
    what: 'LLLL',
    method: locale => moment(A_DATE).locale(locale).format('LLLL'),
  },

  {
    what: 'Mo',
    method: locale => moment(MONDAY).locale(locale).format('dd'),
  },
  {
    what: 'Mon',
    method: locale => moment(MONDAY).locale(locale).format('ddd'),
  },
  {
    what: 'Monday',
    method: locale => moment(MONDAY).locale(locale).format('dddd'),
  },
  {
    what: 'Tu',
    method: locale => moment(TUESDAY).locale(locale).format('dd'),
  },
  {
    what: 'Tue',
    method: locale => moment(TUESDAY).locale(locale).format('ddd'),
  },
  {
    what: 'Tuesday',
    method: locale => moment(TUESDAY).locale(locale).format('dddd'),
  },
  {
    what: 'We',
    method: locale => moment(WEDNESDAY).locale(locale).format('dd'),
  },
  {
    what: 'Wed',
    method: locale => moment(WEDNESDAY).locale(locale).format('ddd'),
  },
  {
    what: 'Wednesday',
    method: locale => moment(WEDNESDAY).locale(locale).format('dddd'),
  },
  {
    what: 'Th',
    method: locale => moment(THURSDAY).locale(locale).format('dd'),
  },
  {
    what: 'Thu',
    method: locale => moment(THURSDAY).locale(locale).format('ddd'),
  },
  {
    what: 'Thursday',
    method: locale => moment(THURSDAY).locale(locale).format('dddd'),
  },
  {
    what: 'Fr',
    method: locale => moment(FRIDAY).locale(locale).format('dd'),
  },
  {
    what: 'Fri',
    method: locale => moment(FRIDAY).locale(locale).format('ddd'),
  },
  {
    what: 'Friday',
    method: locale => moment(FRIDAY).locale(locale).format('dddd'),
  },
  {
    what: 'Sa',
    method: locale => moment(SATURDAY).locale(locale).format('dd'),
  },
  {
    what: 'Sat',
    method: locale => moment(SATURDAY).locale(locale).format('ddd'),
  },
  {
    what: 'Saturday',
    method: locale => moment(SATURDAY).locale(locale).format('dddd'),
  },
  {
    what: 'Su',
    method: locale => moment(SUNDAY).locale(locale).format('dd'),
  },
  {
    what: 'Sun',
    method: locale => moment(SUNDAY).locale(locale).format('ddd'),
  },
  {
    what: 'Sunday',
    method: locale => moment(SUNDAY).locale(locale).format('dddd'),
  },

  {
    what: 'Jan',
    method: locale => moment(JANUARY).locale(locale).format('MMM'),
  },
  {
    what: 'January',
    method: locale => moment(JANUARY).locale(locale).format('MMMM'),
  },
  {
    what: 'Feb',
    method: locale => moment(FEBRUARY).locale(locale).format('MMM'),
  },
  {
    what: 'February',
    method: locale => moment(FEBRUARY).locale(locale).format('MMMM'),
  },
  {
    what: 'Mar',
    method: locale => moment(MARCH).locale(locale).format('MMM'),
  },
  {
    what: 'March',
    method: locale => moment(MARCH).locale(locale).format('MMMM'),
  },
  {
    what: 'Apr',
    method: locale => moment(APRIL).locale(locale).format('MMM'),
  },
  {
    what: 'April',
    method: locale => moment(APRIL).locale(locale).format('MMMM'),
  },
  {
    what: 'May (short)',
    method: locale => moment(MAY).locale(locale).format('MMM'),
  },
  {
    what: 'May (long)',
    method: locale => moment(MAY).locale(locale).format('MMMM'),
  },
  {
    what: 'Jun',
    method: locale => moment(JUNE).locale(locale).format('MMM'),
  },
  {
    what: 'June',
    method: locale => moment(JUNE).locale(locale).format('MMMM'),
  },
  {
    what: 'Jul',
    method: locale => moment(JULY).locale(locale).format('MMM'),
  },
  {
    what: 'July',
    method: locale => moment(JULY).locale(locale).format('MMMM'),
  },
  {
    what: 'Aug',
    method: locale => moment(AUGUST).locale(locale).format('MMM'),
  },
  {
    what: 'August',
    method: locale => moment(AUGUST).locale(locale).format('MMMM'),
  },
  {
    what: 'Sep',
    method: locale => moment(SEPTEMBER).locale(locale).format('MMM'),
  },
  {
    what: 'September',
    method: locale => moment(SEPTEMBER).locale(locale).format('MMMM'),
  },
  {
    what: 'Oct',
    method: locale => moment(OCTOBER).locale(locale).format('MMM'),
  },
  {
    what: 'October',
    method: locale => moment(OCTOBER).locale(locale).format('MMMM'),
  },
  {
    what: 'Nov',
    method: locale => moment(NOVEMBER).locale(locale).format('MMM'),
  },
  {
    what: 'November',
    method: locale => moment(NOVEMBER).locale(locale).format('MMMM'),
  },
  {
    what: 'Dec',
    method: locale => moment(DECEMBER).locale(locale).format('MMM'),
  },
  {
    what: 'December',
    method: locale => moment(DECEMBER).locale(locale).format('MMMM'),
  },

  {
    what: 'calendar sameDay',
    method: locale => moment().locale(locale).calendar(),
  },
  {
    what: 'calendar nextDay',
    method: locale => moment().locale(locale).add(1, 'day').calendar(),
  },
  {
    what: 'calendar nextWeek',
    method: locale =>
      moment().locale(locale).add(1, 'week').startOf('week').calendar(),
  },
  {
    what: 'calendar lastDay',
    method: locale => moment().locale(locale).subtract(1, 'day').calendar(),
  },
  {
    what: 'calendar lastWeek',
    method: locale =>
      moment().locale(locale).subtract(1, 'week').endOf('week').calendar(),
  },
  {
    what: 'calendar sameElse',
    method: locale => moment(A_DATE).locale(locale).calendar(),
  },

  {
    what: '1 second in the past',
    method: locale => moment().locale(locale).subtract(1, 'seconds').fromNow(),
  },
  {
    what: '5 seconds in the past',
    method: locale => moment().locale(locale).subtract(5, 'seconds').fromNow(),
  },
  {
    what: '1 minute in the past',
    method: locale => moment().locale(locale).subtract(1, 'minutes').fromNow(),
  },
  {
    what: '5 minutes in the past',
    method: locale => moment().locale(locale).subtract(5, 'minutes').fromNow(),
  },
  {
    what: '1 hour in the past',
    method: locale => moment().locale(locale).subtract(1, 'hours').fromNow(),
  },
  {
    what: '5 hours in the past',
    method: locale => moment().locale(locale).subtract(5, 'hours').fromNow(),
  },
  {
    what: '1 day in the past',
    method: locale => moment().locale(locale).subtract(1, 'days').fromNow(),
  },
  {
    what: '5 days in the past',
    method: locale => moment().locale(locale).subtract(5, 'days').fromNow(),
  },
  {
    what: '1 month in the past',
    method: locale => moment().locale(locale).subtract(1, 'months').fromNow(),
  },
  {
    what: '5 months in the past',
    method: locale => moment().locale(locale).subtract(5, 'months').fromNow(),
  },
  {
    what: '1 year in the past',
    method: locale => moment().locale(locale).subtract(1, 'years').fromNow(),
  },
  {
    what: '5 years in the past',
    method: locale => moment().locale(locale).subtract(5, 'years').fromNow(),
  },

  {
    what: '1 second in the future',
    method: locale => moment().locale(locale).add(1, 'seconds').fromNow(),
  },
  {
    what: '5 seconds in the future',
    method: locale => moment().locale(locale).add(5, 'seconds').fromNow(),
  },
  {
    what: '1 minute in the future',
    method: locale => moment().locale(locale).add(1, 'minutes').fromNow(),
  },
  {
    what: '5 minutes in the future',
    method: locale => moment().locale(locale).add(5, 'minutes').fromNow(),
  },
  {
    what: '1 hour in the future',
    method: locale => moment().locale(locale).add(1, 'hours').fromNow(),
  },
  {
    what: '5 hours in the future',
    method: locale => moment().locale(locale).add(5, 'hours').fromNow(),
  },
  {
    what: '1 day in the future',
    method: locale => moment().locale(locale).add(1, 'days').fromNow(),
  },
  {
    what: '5 days in the future',
    method: locale => moment().locale(locale).add(5, 'days').fromNow(),
  },
  {
    what: '1 month in the future',
    method: locale => moment().locale(locale).add(1, 'months').fromNow(),
  },
  {
    what: '5 months in the future',
    method: locale => moment().locale(locale).add(5, 'months').fromNow(),
  },
  {
    what: '1 year in the future',
    method: locale => moment().locale(locale).add(1, 'years').fromNow(),
  },
  {
    what: '5 years in the future',
    method: locale => moment().locale(locale).add(5, 'years').fromNow(),
  },
];
/* eslint-enable prettier/prettier */

const Table = styled.table`
  margin: ${GEL_SPACING_DBL};
  border: 1px solid ${props => props.theme.palette.PEBBLE};
  font-family: ${GEL_FF_REITH_SANS};

  & td,
  th {
    padding: ${GEL_SPACING_HLF} ${GEL_SPACING};
    border: 1px solid ${props => props.theme.palette.PEBBLE};
  }
`;

const ShowMoment = ({ dir, lang, locale, moments, name }) => {
  return (
    <Table>
      <tbody>
        <tr>
          <th>key</th>
          <th>British English</th>
          <th>{name}</th>
        </tr>
        {moments.map(({ what, method }, index) => (
          /* eslint-disable react/no-array-index-key */
          <tr key={index}>
            <td>{what}</td>
            <td>{method('en-gb')}</td>
            <td dir={dir} lang={lang}>
              {method(locale)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const editorialStories = storiesOf('Moment Locales/Editorial view', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>);

const developerStories = storiesOf('Moment Locales/Developer view', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>);

const capitalizeService = service =>
  service.charAt(0).toUpperCase() + service.slice(1);

Object.keys(services).forEach(service => {
  Object.keys(services[service])
    .filter(variant => services[service][variant].datetimeLocale)
    .forEach(variant => {
      const serviceName = capitalizeService(service);
      const {
        dir,
        lang,
        datetimeLocale: serviceLocale,
      } = services[service][variant];
      const storyTitle = `${serviceName} - ${serviceLocale} ${
        variant !== 'default' ? `(${variant})` : ''
      }`;

      editorialStories.add(storyTitle, () => (
        <ShowMoment
          dir={dir}
          lang={lang}
          name={serviceName}
          locale={serviceLocale}
          moments={methods.filter(method =>
            editorialWhitelist.includes(method.what),
          )}
        />
      ));

      developerStories.add(storyTitle, () => {
        return (
          <ShowMoment
            dir={dir}
            lang={lang}
            name={serviceName}
            locale={serviceLocale}
            moments={methods}
          />
        );
      });
    });
});
