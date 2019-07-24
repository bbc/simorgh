import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { C_PEBBLE } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';
import { GEL_FF_REITH_SANS } from '@bbc/gel-foundations/typography';

// ensure all moment locales have been loaded via service configs
import '../../config/services/index';

const locales = [
  { name: 'Gujarati', locale: 'gu' },
  { name: 'Igbo', locale: 'ig' },
  { name: 'Indonesian', locale: 'id' },
  { name: 'Korean', locale: 'ko' },
  { name: 'Marathi', locale: 'mr' },
  { name: 'Pidgin', locale: 'pcm' },
  { name: 'Punjabi', locale: 'pa-in' },
  { name: 'Telugu', locale: 'te' },
  { name: 'Thai', locale: 'th' },
  { name: 'Yoruba', locale: 'yo' },
];

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

const THIS_DATE = 946826177000;
/* eslint-disable prettier/prettier */
const funcs = [
  { what: '[default format]', func: locale => moment(THIS_DATE).locale(locale).format() },
  { what: 'MMM Do YYYY', func: locale => moment(THIS_DATE).locale(locale).format("MMM Do YYYY") },
  { what: 'MMMM Do YYYY, h:mm:ss a', func: locale => moment(THIS_DATE).locale(locale).format('MMMM Do YYYY, h:mm:ss a') },
  { what: 'YYYY [escaped text] YYYY', func: locale => moment(THIS_DATE).locale(locale).format('YYYY [escaped text] YYYY') },
  { what: 'LT', func: locale => moment(THIS_DATE).locale(locale).format('LT') },
  { what: 'LTS', func: locale => moment(THIS_DATE).locale(locale).format('LTS') },
  { what: 'l', func: locale => moment(THIS_DATE).locale(locale).format('l') },
  { what: 'L', func: locale => moment(THIS_DATE).locale(locale).format('L') },
  { what: 'll', func: locale => moment(THIS_DATE).locale(locale).format('ll') },
  { what: 'LL', func: locale => moment(THIS_DATE).locale(locale).format('LL') },
  { what: 'lll', func: locale => moment(THIS_DATE).locale(locale).format('lll') },
  { what: 'LLL', func: locale => moment(THIS_DATE).locale(locale).format('LLL') },
  { what: 'llll', func: locale => moment(THIS_DATE).locale(locale).format('llll') },
  { what: 'LLLL', func: locale => moment(THIS_DATE).locale(locale).format('LLLL') },

  { what: 'Mo', func: locale => moment(1563796800000).locale(locale).format('dd') },
  { what: 'Mon', func: locale => moment(1563796800000).locale(locale).format('ddd') },
  { what: 'Monday', func: locale => moment(1563796800000).locale(locale).format('dddd') },
  { what: 'Tu', func: locale => moment(1563883200000).locale(locale).format('dd') },
  { what: 'Tue', func: locale => moment(1563883200000).locale(locale).format('ddd') },
  { what: 'Tuesday', func: locale => moment(1563883200000).locale(locale).format('dddd') },
  { what: 'We', func: locale => moment(1563969600000).locale(locale).format('dd') },
  { what: 'Wed', func: locale => moment(1563969600000).locale(locale).format('ddd') },
  { what: 'Wednesday', func: locale => moment(1563969600000).locale(locale).format('dddd') },
  { what: 'Th', func: locale => moment(1564056000000).locale(locale).format('dd') },
  { what: 'Thu', func: locale => moment(1564056000000).locale(locale).format('ddd') },
  { what: 'Thursday', func: locale => moment(1564056000000).locale(locale).format('dddd') },
  { what: 'Fr', func: locale => moment(1564142400000).locale(locale).format('dd') },
  { what: 'Fri', func: locale => moment(1564142400000).locale(locale).format('ddd') },
  { what: 'Friday', func: locale => moment(1564142400000).locale(locale).format('dddd') },
  { what: 'Sa', func: locale => moment(1564228800000).locale(locale).format('dd') },
  { what: 'Sat', func: locale => moment(1564228800000).locale(locale).format('ddd') },
  { what: 'Saturday', func: locale => moment(1564228800000).locale(locale).format('dddd') },
  { what: 'Su', func: locale => moment(1564315200000).locale(locale).format('dd') },
  { what: 'Sun', func: locale => moment(1564315200000).locale(locale).format('ddd') },
  { what: 'Sunday', func: locale => moment(1564315200000).locale(locale).format('dddd') },


  { what: 'Jan', func: locale => moment(1547510400000).locale(locale).format('MMM') },
  { what: 'January', func: locale => moment(1547510400000).locale(locale).format('MMMM') },
  { what: 'Feb', func: locale => moment(1550188800000).locale(locale).format('MMM') },
  { what: 'February', func: locale => moment(1550188800000).locale(locale).format('MMMM') },
  { what: 'Mar', func: locale => moment(1552608000000).locale(locale).format('MMM') },
  { what: 'March', func: locale => moment(1552608000000).locale(locale).format('MMMM') },
  { what: 'Apr', func: locale => moment(1555286400000).locale(locale).format('MMM') },
  { what: 'April', func: locale => moment(1555286400000).locale(locale).format('MMMM') },
  { what: 'May (short)', func: locale => moment(1557878400000).locale(locale).format('MMM') },
  { what: 'May (long)', func: locale => moment(1557878400000).locale(locale).format('MMMM') },
  { what: 'Jun', func: locale => moment(1560556800000).locale(locale).format('MMM') },
  { what: 'June', func: locale => moment(1560556800000).locale(locale).format('MMMM') },
  { what: 'Jul', func: locale => moment(1563148800000).locale(locale).format('MMM') },
  { what: 'July', func: locale => moment(1563148800000).locale(locale).format('MMMM') },
  { what: 'Aug', func: locale => moment(1565827200000).locale(locale).format('MMM') },
  { what: 'August', func: locale => moment(1565827200000).locale(locale).format('MMMM') },
  { what: 'Sep', func: locale => moment(1568505600000).locale(locale).format('MMM') },
  { what: 'September', func: locale => moment(1568505600000).locale(locale).format('MMMM') },
  { what: 'Oct', func: locale => moment(1571097600000).locale(locale).format('MMM') },
  { what: 'October', func: locale => moment(1571097600000).locale(locale).format('MMMM') },
  { what: 'Nov', func: locale => moment(1573776000000).locale(locale).format('MMM') },
  { what: 'November', func: locale => moment(1573776000000).locale(locale).format('MMMM') },
  { what: 'Dec', func: locale => moment(1576368000000).locale(locale).format('MMM') },
  { what: 'December', func: locale => moment(1576368000000).locale(locale).format('MMMM') },


  { what: 'calendar sameDay', func: locale => moment().locale(locale).calendar() },
  { what: 'calendar nextDay', func: locale => moment().locale(locale).add(1, 'day').calendar() },
  { what: 'calendar nextWeek', func: locale => moment().locale(locale).add(1, 'week').startOf('week').calendar() },
  { what: 'calendar lastDay', func: locale => moment().locale(locale).subtract(1, 'day').calendar() },
  { what: 'calendar lastWeek', func: locale => moment().locale(locale).subtract(1, 'week').endOf('week').calendar() },
  { what: 'calendar sameElse', func: locale => moment(THIS_DATE).locale(locale).calendar() },

  { what: '1 second in the past', func: locale => moment().locale(locale).subtract(1, 'seconds').fromNow() },
  { what: '5 seconds in the past', func: locale => moment().locale(locale).subtract(5, 'seconds').fromNow() },
  { what: '10 seconds in the past', func: locale => moment().locale(locale).subtract(10, 'seconds').fromNow() },
  { what: '1 minute in the past', func: locale => moment().locale(locale).subtract(1, 'minutes').fromNow() },
  { what: '5 minutes in the past', func: locale => moment().locale(locale).subtract(5, 'minutes').fromNow() },
  { what: '10 minutes in the past', func: locale => moment().locale(locale).subtract(10, 'minutes').fromNow() },
  { what: '1 hour in the past', func: locale => moment().locale(locale).subtract(1, 'hours').fromNow() },
  { what: '5 hours in the past', func: locale => moment().locale(locale).subtract(5, 'hours').fromNow() },
  { what: '10 hours in the past', func: locale => moment().locale(locale).subtract(10, 'hours').fromNow() },
  { what: '1 day in the past', func: locale => moment().locale(locale).subtract(1, 'days').fromNow() },
  { what: '5 days in the past', func: locale => moment().locale(locale).subtract(5, 'days').fromNow() },
  { what: '10 days in the past', func: locale => moment().locale(locale).subtract(10, 'days').fromNow() },
  { what: '1 month in the past', func: locale => moment().locale(locale).subtract(1, 'months').fromNow() },
  { what: '5 months in the past', func: locale => moment().locale(locale).subtract(5, 'months').fromNow() },
  { what: '10 months in the past', func: locale => moment().locale(locale).subtract(10, 'months').fromNow() },
  { what: '1 year in the past', func: locale => moment().locale(locale).subtract(1, 'years').fromNow() },
  { what: '5 years in the past', func: locale => moment().locale(locale).subtract(5, 'years').fromNow() },
  { what: '10 years in the past', func: locale => moment().locale(locale).subtract(10, 'years').fromNow() },

  { what: '1 second in the future', func: locale => moment().locale(locale).add(1, 'seconds').fromNow() },
  { what: '5 seconds in the future', func: locale => moment().locale(locale).add(5, 'seconds').fromNow() },
  { what: '10 seconds in the future', func: locale => moment().locale(locale).add(10, 'seconds').fromNow() },
  { what: '1 minute in the future', func: locale => moment().locale(locale).add(1, 'minutes').fromNow() },
  { what: '5 minutes in the future', func: locale => moment().locale(locale).add(5, 'minutes').fromNow() },
  { what: '10 minutes in the future', func: locale => moment().locale(locale).add(10, 'minutes').fromNow() },
  { what: '1 hour in the future', func: locale => moment().locale(locale).add(1, 'hours').fromNow() },
  { what: '5 hours in the future', func: locale => moment().locale(locale).add(5, 'hours').fromNow() },
  { what: '10 hours in the future', func: locale => moment().locale(locale).add(10, 'hours').fromNow() },
  { what: '1 day in the future', func: locale => moment().locale(locale).add(1, 'days').fromNow() },
  { what: '5 days in the future', func: locale => moment().locale(locale).add(5, 'days').fromNow() },
  { what: '10 days in the future', func: locale => moment().locale(locale).add(10, 'days').fromNow() },
  { what: '1 month in the future', func: locale => moment().locale(locale).add(1, 'months').fromNow() },
  { what: '5 months in the future', func: locale => moment().locale(locale).add(5, 'months').fromNow() },
  { what: '10 months in the future', func: locale => moment().locale(locale).add(10, 'months').fromNow() },
  { what: '1 year in the future', func: locale => moment().locale(locale).add(1, 'years').fromNow() },
  { what: '5 years in the future', func: locale => moment().locale(locale).add(5, 'years').fromNow() },
  { what: '10 years in the future', func: locale => moment().locale(locale).add(10, 'years').fromNow() },

];
/* eslint-enable prettier/prettier */

const Table = styled.table`
  margin: ${GEL_SPACING_DBL};
  border: 1px solid ${C_PEBBLE};
  font-family: ${GEL_FF_REITH_SANS};

  & td,
  th {
    padding: ${GEL_SPACING_HLF} ${GEL_SPACING};
    border: 1px solid ${C_PEBBLE};
  }
`;

const stories = storiesOf('Moment Locales', module);

locales.forEach(({ name, locale }) => {
  stories.add(`${name} - ${locale}`, () => (
    <Table>
      <tbody>
        <tr>
          <th>key</th>
          <th>British English</th>
          <th>{name}</th>
        </tr>
        {funcs.map(({ what, func }, index) => (
          /* eslint-disable react/no-array-index-key */
          <tr key={index}>
            <td>{what}</td>
            <td>{func('en-gb')}</td>
            <td>{func(locale)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ));
});
