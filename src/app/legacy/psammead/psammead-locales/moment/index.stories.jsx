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
import notes from '../README.md';
import './am';
import './ar';
import './az';
import './bn';
import './en-gb';
import './es';
import './gu';
import './ha';
import './hi';
import './ig';
import './ky';
import './mr';
import './ne';
import './om';
import './pa-in';
import './pcm';
import './ps';
import './pt-br';
import './ru';
import './rw';
import './si';
import './so';
import './sr';
import './sr-cyrl';
import './sw';
import './ta';
import './th';
import './ti';
import './uk';
import './ur';
import './uz';
import './yo';

const stories = storiesOf('Utilities/Psammead Locales', module);

const locales = [
  { name: 'Afaan Oromoo', locale: 'om' },
  { name: 'Amharic', locale: 'am' },
  { name: 'Arabic', locale: 'ar', dir: 'rtl' },
  { name: 'Azeri', locale: 'az' },
  { name: 'Brasil', locale: 'pt-br' },
  { name: 'Bengali', locale: 'bn' },
  { name: 'Gahuza', locale: 'rw' },
  { name: 'Gujarati', locale: 'gu' },
  { name: 'Hausa', locale: 'ha' },
  { name: 'Hindi', locale: 'hi' },
  { name: 'Igbo', locale: 'ig' },
  { name: 'Kyrgyz', locale: 'ky' },
  { name: 'Marathi', locale: 'mr' },
  { name: 'Mundo', locale: 'es' },
  { name: 'Nepali', locale: 'ne' },
  { name: 'News', locale: 'en-gb' },
  { name: 'Pashto', locale: 'ps', dir: 'rtl' },
  { name: 'Pidgin', locale: 'pcm' },
  { name: 'Punjabi', locale: 'pa-in' },
  { name: 'Russian', locale: 'ru' },
  { name: 'Scotland', locale: 'en-gb' },
  { name: 'Serbian', locale: 'sr' },
  { name: 'Serbian Cyrillic', locale: 'sr-cyrl' },
  { name: 'Sinhala', locale: 'si' },
  { name: 'Somali', locale: 'so' },
  { name: 'Swahili', locale: 'sw' },
  { name: 'Tamil', locale: 'ta' },
  { name: 'Thai', locale: 'th' },
  { name: 'Tigrinya', locale: 'ti' },
  { name: 'Ukrainian', locale: 'uk' },
  { name: 'Urdu', locale: 'ur', dir: 'rtl' },
  { name: 'Uzbek', locale: 'uz' },
  { name: 'Yoruba', locale: 'yo' },
];

// Fixed timestamp for 27 August 2019, 14:54 BST
const fixedTimestamp = 1566914061212;

/* eslint-disable prettier/prettier */
const funcs = [
  (locale) =>
    moment(fixedTimestamp).locale(locale).format('MMMM Do YYYY, h:mm:ss a'),
  (locale) => moment().locale(locale).subtract({ m: 1 }).fromNow(),
  (locale) => moment().locale(locale).subtract({ m: 15 }).fromNow(),
  (locale) => moment(fixedTimestamp).locale(locale).format('dddd'),
  (locale) => moment(fixedTimestamp).locale(locale).format('MMM Do YY'),
  (locale) =>
    moment(fixedTimestamp).locale(locale).format('YYYY [escaped text] YYYY'),
  (locale) => moment(fixedTimestamp).locale(locale).format(),
  (locale) =>
    moment('20111031', 'YYYYMMDD').locale(locale).from(fixedTimestamp),
  (locale) =>
    moment('20120620', 'YYYYMMDD').locale(locale).from(fixedTimestamp),
  (locale) =>
    moment(fixedTimestamp).locale(locale).startOf('day').from(fixedTimestamp),
  (locale) =>
    moment(fixedTimestamp).locale(locale).endOf('day').from(fixedTimestamp),
  (locale) =>
    moment(fixedTimestamp).locale(locale).startOf('hour').from(fixedTimestamp),
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
  (locale) => moment(fixedTimestamp).locale(locale).format('LL'),
  (locale) => moment(fixedTimestamp).locale(locale).format('ll'),
  (locale) => moment(fixedTimestamp).locale(locale).format('LLL'),
  (locale) => moment(fixedTimestamp).locale(locale).format('lll'),
  (locale) => moment(fixedTimestamp).locale(locale).format('LLLL'),
  (locale) => moment(fixedTimestamp).locale(locale).format('llll'),
];
/* eslint-enable prettier/prettier */

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
  `https://github.com/bbc/psammead/issues/new?labels=bug&title=Moment+translation+correction+for+${localeName}&projects=bbc/20`;

locales.forEach(({ name, locale, dir }) => {
  stories.add(
    `Moment - ${name}(${locale})`,
    () => (
      <>
        <Table>
          <tbody>
            <tr>
              <th>British English</th>
              <th>{name}</th>
            </tr>
            {funcs.map((func, index) => (
              /* eslint-disable react/no-array-index-key */
              <tr key={index}>
                <td>{func('en-gb')}</td>
                <td dir={dir}>{func(locale)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paragraph>
          Spot an incorrect translation? Please write us a github issue{' '}
          <a href={issueHref(name)}>here</a> so we can fix it!
        </Paragraph>
      </>
    ),
    {
      notes,
      chromatic: { disable: true },
    }
  );
});
