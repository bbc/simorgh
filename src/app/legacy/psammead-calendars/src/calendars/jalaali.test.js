import moment from 'moment';
import jalaali from './jalaali';

describe('Jalaali Conversion Tests', () => {
  moment.defineLocale('ps', {});
  const testScenarios = [
    {
      testMoment: moment('2019-01-01').locale('fa'),
      expected: '۱۱ دی ۱۳۹۷',
      summary:
        'should return first day of the year 2019 in Jalaali for persian',
    },
    {
      testMoment: moment('2019-12-31').locale('fa'),
      expected: '۱۰ دی ۱۳۹۸',
      summary: 'should return last day of the year 2019 in Jalaali for persian',
    },
    {
      testMoment: moment('2025-02-01').locale('fa'),
      expected: '۱۳ بهمن ۱۴۰۳',
      summary: 'should return first day of Febuary 2025 in Jalaali for persian',
    },
    {
      testMoment: moment('2025-11-31').locale('fa'),
      expected: null,
      summary: "should return null as date doesn't exist",
    },
    {
      testMoment: moment('2019-01-01').locale('ps'),
      expected: '۱۱ مرغومی ۱۳۹۷',
      summary: 'should return first day of the year 2019 in Jalaali for pashto',
    },
    {
      testMoment: moment('2019-12-31').locale('ps'),
      expected: '۱۰ مرغومی ۱۳۹۸',
      summary: 'should return last day of the year 2019 in Jalaali for pashto',
    },
    {
      testMoment: moment('2025-02-01').locale('ps'),
      expected: '۱۳ سلواغه ۱۴۰۳',
      summary: 'should return first day of Febuary 2025 in Jalaali for pashto',
    },
    {
      testMoment: moment('2025-11-31').locale('ps'),
      expected: null,
      summary: "should return null as date doesn't exist",
    },
    {
      testMoment: null,
      expected: null,
      summary: 'should return null if item passed is null',
    },
    {
      testMoment: undefined,
      expected: null,
      summary: 'should return null if item passed is undefined',
    },
    {
      testMoment: {},
      expected: null,
      summary: 'should return null if item passed is a random object',
    },
    {
      testMoment: '',
      expected: null,
      summary: 'should return null if item passed is a string',
    },
    {
      testMoment: 2,
      expected: null,
      summary: 'should return null if item passed is an integer',
    },
    {
      testMoment: false,
      expected: null,
      summary: 'should return null if item passed is a boolean',
    },
  ];
  testScenarios.forEach(({ testMoment, expected, summary }) => {
    it(summary, () => {
      const jalaaliCalendar = jalaali.formatDate(testMoment);
      expect(jalaaliCalendar).toEqual(expected);
    });
  });
});
