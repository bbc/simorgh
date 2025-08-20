/* eslint-disable import/no-duplicates */
import moment from 'moment';
import './fa-af';
import { months } from './fa-af';

moment.locale('fa-af');

// This asset overrides the gunit assertion done in the moment codebase.
// Format and styling of this file has been keep consistent with the official moment tests.
// An example of these tests can be seen at https://github.com/moment/moment/blob/develop/src/test/locale/en-gb.js
const assert = {
  equal: (val1, val2, message) => expect(val1, message).toEqual(val2),
};

test('parse', () => {
  const tests = months;
  let i;
  function equalTest(input, mmm, j) {
    assert.equal(
      moment(input, mmm).month(),
      j,
      `${input} should be month ${j + 1} instead is month ${moment(
        input,
        mmm
      ).month()}`
    );
  }

  function equalTestStrict(input, mmm, monthIndex) {
    assert.equal(
      moment(input, mmm, true).month(),
      monthIndex,
      `${input} ${mmm} should be strict month ${monthIndex + 1}`
    );
  }

  for (i = 0; i < 12; i += 1) {
    equalTest(tests[i], 'MMM', i);
    equalTest(tests[i], 'MMMM', i);
    equalTest(tests[i].toLocaleLowerCase(), 'MMM', i);
    equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
    equalTest(tests[i].toLocaleUpperCase(), 'MMM', i);
    equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);

    equalTestStrict(tests[i], 'MMM', i);
    equalTestStrict(tests[i], 'MMMM', i);
    equalTestStrict(tests[i].toLocaleLowerCase(), 'MMM', i);
    equalTestStrict(tests[i].toLocaleUpperCase(), 'MMM', i);
    equalTestStrict(tests[i].toLocaleLowerCase(), 'MMMM', i);
    equalTestStrict(tests[i].toLocaleUpperCase(), 'MMMM', i);
  }
});

test('format', () => {
  const a = [
    [
      'dddd, MMMM Do YYYY, h:mm:ss a',
      'یک\u200cشنبه، فوریه ۱۴م ۲۰۱۰، ۳:۲۵:۵۰ بعد از ظهر',
    ],
    ['ddd, hA', 'یک\u200cشنبه، ۳بعد از ظهر'],
    ['M Mo MM MMMM MMM', '۲ ۲م ۰۲ فوریه فوریه'],
    ['YYYY YY', '۲۰۱۰ ۱۰'],
    ['D Do DD', '۱۴ ۱۴م ۱۴'],
    ['d do dddd ddd dd', '۰ ۰م یک\u200cشنبه یک\u200cشنبه ی'],
    ['DDD DDDo DDDD', '۴۵ ۴۵م ۰۴۵'],
    ['w wo ww', '۸ ۸م ۰۸'],
    ['h hh', '۳ ۰۳'],
    ['H HH', '۱۵ ۱۵'],
    ['m mm', '۲۵ ۲۵'],
    ['s ss', '۵۰ ۵۰'],
    ['a A', 'بعد از ظهر بعد از ظهر'],
    ['DDDo [روز سال]', '۴۵م روز سال'],
    ['LTS', '۱۵:۲۵:۵۰'],
    ['L', '۱۴/۰۲/۲۰۱۰'],
    ['LL', '۱۴ فوریه ۲۰۱۰'],
    ['LLL', '۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
    ['LLLL', 'یک\u200cشنبه، ۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
    ['l', '۱۴/۲/۲۰۱۰'],
    ['ll', '۱۴ فوریه ۲۰۱۰'],
    ['lll', '۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
    ['llll', 'یک\u200cشنبه، ۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
  ];
  const date = new Date(2010, 1, 14, 15, 25, 50, 125);
  const b = moment(date);
  let i;
  for (i = 0; i < a.length; i += 1) {
    assert.equal(
      b.format(a[i][0]),
      a[i][1],
      `${date.toISOString()} with format: ${a[i][0]} ---> ${a[i][1]}`
    );
  }
});

test('from', () => {
  const start = moment([2007, 1, 28]);
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
    '۱ دقیقه',
    '45 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
    '۱ دقیقه',
    '89 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
    '۲ دقیقې',
    '90 seconds = 2 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
    '۴۴ دقیقې',
    '44 minutes = 44 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
    '۱ ساعت',
    '45 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
    '۱ ساعت',
    '89 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
    '۲ ساعتونه',
    '90 minutes = 2 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
    '۵ ساعتونه',
    '5 hours = 5 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
    '۲۱ ساعتونه',
    '21 hours = 21 hours'
  );
});
