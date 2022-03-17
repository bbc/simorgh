import moment from 'moment';
import './ig';

moment.locale('ig');

// This asset overrides the gunit assertion done in the moment codebase.
// Format and styling of this file has been keep consistent with the official moment tests.
// An example of these tests can be seen at https://github.com/moment/moment/blob/develop/src/test/locale/en-gb.js
const assert = { equal: (val1, val2) => expect(val1).toEqual(val2) };

test('parse', function () {
  var tests = 'Jenụwarị Jen_Febụwarị Feb_Maachị Maa_Eprel Epr_Mee Mee_Juun Juu_Julaị Jul_Ọgọọst Ọgọ_Septemba Sep_Ọktọba Ọkt_Nọvemba Nov_Disemba Dis'.split(
      '_'
    ),
    i;
  function equalTest(input, mmm, i) {
    assert.equal(
      moment(input, mmm).month(),
      i,
      input + ' should be month ' + (i + 1)
    );
  }
  for (i = 0; i < 12; i++) {
    tests[i] = tests[i].split(' ');
    equalTest(tests[i][0], 'MMM', i);
    equalTest(tests[i][1], 'MMM', i);
    equalTest(tests[i][0], 'MMMM', i);
    equalTest(tests[i][1], 'MMMM', i);
    equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
    equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
    equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
    equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
  }
});

test('format', function () {
  var a = [
      [
        'dddd, MMMM Do YYYY, h:mm:ss a',
        'Sọnde, Febụwarị Nke 14 2010, 3:25:50 pm',
      ],
      ['ddd, hA', 'Sọn, 3PM'],
      ['M Mo MM MMMM MMM', '2 Nke 2 02 Febụwarị Feb'],
      ['YYYY YY', '2010 10'],
      ['D Do DD', '14 Nke 14 14'],
      ['d do dddd ddd dd', '0 Nke 0 Sọnde Sọn Su'],
      ['DDD DDDo DDDD', '45 Nke 45 045'],
      ['w wo ww', '6 Nke 6 06'],
      ['h hh', '3 03'],
      ['H HH', '15 15'],
      ['m mm', '25 25'],
      ['s ss', '50 50'],
      ['a A', 'pm PM'],
      ['[the] DDDo [day of the year]', 'the Nke 45 day of the year'],
      ['LTS', '15:25:50'],
      ['L', '14/02/2010'],
      ['LL', '14 Febụwarị 2010'],
      ['LLL', '14 Febụwarị 2010 15:25'],
      ['LLLL', 'Sọnde, Febụwarị 14 2010 15:25'],
      ['l', '14/2/2010'],
      ['ll', '14 Feb 2010'],
      ['lll', '14 Feb 2010 15:25'],
      ['llll', 'Sọn, Feb 14 2010 15:25'],
    ],
    b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
    i;
  for (i = 0; i < a.length; i++) {
    assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
  }
});

test('format ordinal', function () {
  assert.equal(moment([2011, 0, 1]).format('DDDo'), 'Nke 1', '1st');
  assert.equal(moment([2011, 0, 2]).format('DDDo'), 'Nke 2', '2nd');
  assert.equal(moment([2011, 0, 3]).format('DDDo'), 'Nke 3', '3rd');
  assert.equal(moment([2011, 0, 4]).format('DDDo'), 'Nke 4', '4th');
  assert.equal(moment([2011, 0, 5]).format('DDDo'), 'Nke 5', '5th');
  assert.equal(moment([2011, 0, 6]).format('DDDo'), 'Nke 6', '6th');
  assert.equal(moment([2011, 0, 7]).format('DDDo'), 'Nke 7', '7th');
  assert.equal(moment([2011, 0, 8]).format('DDDo'), 'Nke 8', '8th');
  assert.equal(moment([2011, 0, 9]).format('DDDo'), 'Nke 9', '9th');
  assert.equal(moment([2011, 0, 10]).format('DDDo'), 'Nke 10', '10th');

  assert.equal(moment([2011, 0, 11]).format('DDDo'), 'Nke 11', '11th');
  assert.equal(moment([2011, 0, 12]).format('DDDo'), 'Nke 12', '12th');
  assert.equal(moment([2011, 0, 13]).format('DDDo'), 'Nke 13', '13th');
  assert.equal(moment([2011, 0, 14]).format('DDDo'), 'Nke 14', '14th');
  assert.equal(moment([2011, 0, 15]).format('DDDo'), 'Nke 15', '15th');
  assert.equal(moment([2011, 0, 16]).format('DDDo'), 'Nke 16', '16th');
  assert.equal(moment([2011, 0, 17]).format('DDDo'), 'Nke 17', '17th');
  assert.equal(moment([2011, 0, 18]).format('DDDo'), 'Nke 18', '18th');
  assert.equal(moment([2011, 0, 19]).format('DDDo'), 'Nke 19', '19th');
  assert.equal(moment([2011, 0, 20]).format('DDDo'), 'Nke 20', '20th');

  assert.equal(moment([2011, 0, 21]).format('DDDo'), 'Nke 21', '21st');
  assert.equal(moment([2011, 0, 22]).format('DDDo'), 'Nke 22', '22nd');
  assert.equal(moment([2011, 0, 23]).format('DDDo'), 'Nke 23', '23rd');
  assert.equal(moment([2011, 0, 24]).format('DDDo'), 'Nke 24', '24th');
  assert.equal(moment([2011, 0, 25]).format('DDDo'), 'Nke 25', '25th');
  assert.equal(moment([2011, 0, 26]).format('DDDo'), 'Nke 26', '26th');
  assert.equal(moment([2011, 0, 27]).format('DDDo'), 'Nke 27', '27th');
  assert.equal(moment([2011, 0, 28]).format('DDDo'), 'Nke 28', '28th');
  assert.equal(moment([2011, 0, 29]).format('DDDo'), 'Nke 29', '29th');
  assert.equal(moment([2011, 0, 30]).format('DDDo'), 'Nke 30', '30th');

  assert.equal(moment([2011, 0, 31]).format('DDDo'), 'Nke 31', '31st');
});

test('format month', function () {
  var expected = 'Jenụwarị Jen_Febụwarị Feb_Maachị Maa_Eprel Epr_Mee Mee_Juun Juu_Julaị Jul_Ọgọọst Ọgọ_Septemba Sep_Ọktọba Ọkt_Nọvemba Nov_Disemba Dis'.split(
      '_'
    ),
    i;
  for (i = 0; i < expected.length; i++) {
    assert.equal(
      moment([2011, i, 1]).format('MMMM MMM'),
      expected[i],
      expected[i]
    );
  }
});

test('format week', function () {
  var expected = 'Sọnde Sọn Su_Mọnde Mọn Mọ_Tuzde Tuz Tu_Wenesde We We_Tọsde Tọs Tọ_Fraịde Frai Fr_Satọde Sat Sa'.split(
      '_'
    ),
    i;
  for (i = 0; i < expected.length; i++) {
    assert.equal(
      moment([2011, 0, 2 + i]).format('dddd ddd dd'),
      expected[i],
      expected[i]
    );
  }
});

test('from', function () {
  var start = moment([2007, 1, 28]);
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
    'ntabịanya ole na ole',
    '44 seconds = a few seconds'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
    'otu nkeji',
    '45 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
    'otu nkeji',
    '89 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
    'nkeji 2',
    '90 seconds = 2 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
    'nkeji 44',
    '44 minutes = 44 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
    'otu elekere',
    '45 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
    'otu elekere',
    '89 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
    'elekere 2',
    '90 minutes = 2 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
    'elekere 5',
    '5 hours = 5 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
    'elekere 21',
    '21 hours = 21 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
    'otu ụbọchị',
    '22 hours = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
    'otu ụbọchị',
    '35 hours = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
    'Ụbọchị 2',
    '36 hours = 2 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
    'otu ụbọchị',
    '1 day = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
    'Ụbọchị 5',
    '5 days = 5 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
    'Ụbọchị 25',
    '25 days = 25 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
    'otu ọnwa',
    '26 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
    'otu ọnwa',
    '30 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
    'otu ọnwa',
    '43 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
    'Ọnwa 2',
    '46 days = 2 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
    'Ọnwa 2',
    '75 days = 2 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
    'Ọnwa 3',
    '76 days = 3 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
    'otu ọnwa',
    '1 month = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
    'Ọnwa 5',
    '5 months = 5 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
    'Otu afọ',
    '345 days = a year'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
    'Afọ 2',
    '548 days = 2 years'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
    'Otu afọ',
    '1 year = a year'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
    'Afọ 5',
    '5 years = 5 years'
  );
});

test('suffix', function () {
  assert.equal(moment(30000).from(0), 'na ntabịanya ole na ole', 'prefix');
  assert.equal(
    moment(0).from(30000),
    'ntabịanya ole na ole gara aga',
    'suffix'
  );
});

test('now from now', function () {
  assert.equal(
    moment().fromNow(),
    'ntabịanya ole na ole gara aga',
    'now from now should display as in the past'
  );
});

test('fromNow', function () {
  assert.equal(
    moment().add({ s: 30 }).fromNow(),
    'na ntabịanya ole na ole',
    'in a few seconds'
  );
  assert.equal(moment().add({ d: 5 }).fromNow(), 'na Ụbọchị 5', 'in 5 days');
});

test('calendar day', function () {
  var a = moment().hours(12).minutes(0).seconds(0);

  assert.equal(moment(a).calendar(), 'Taa na 12:00', 'today at the same time');
  assert.equal(
    moment(a).add({ m: 25 }).calendar(),
    'Taa na 12:25',
    'Now plus 25 min'
  );
  assert.equal(
    moment(a).add({ h: 1 }).calendar(),
    'Taa na 13:00',
    'Now plus 1 hour'
  );
  assert.equal(
    moment(a).add({ d: 1 }).calendar(),
    'Echi na 12:00',
    'tomorrow at the same time'
  );
  assert.equal(
    moment(a).subtract({ h: 1 }).calendar(),
    'Taa na 11:00',
    'Now minus 1 hour'
  );
  assert.equal(
    moment(a).subtract({ d: 1 }).calendar(),
    'Unyaahụ na 12:00',
    'yesterday at the same time'
  );
});

test('calendar next week', function () {
  var i, m;
  for (i = 2; i < 7; i++) {
    m = moment().add({ d: i });
    assert.equal(
      m.calendar(),
      m.format('dddd [na] LT'),
      'Today + ' + i + ' days current time'
    );
    m.hours(0).minutes(0).seconds(0).milliseconds(0);
    assert.equal(
      m.calendar(),
      m.format('dddd [na] LT'),
      'Today + ' + i + ' days beginning of day'
    );
    m.hours(23).minutes(59).seconds(59).milliseconds(999);
    assert.equal(
      m.calendar(),
      m.format('dddd [na] LT'),
      'Today + ' + i + ' days end of day'
    );
  }
});

test('calendar last week', function () {
  var i, m;

  for (i = 2; i < 7; i++) {
    m = moment().subtract({ d: i });
    assert.equal(
      m.calendar(),
      m.format('dddd [gara aga na] LT'),
      'Today - ' + i + ' days current time'
    );
    m.hours(0).minutes(0).seconds(0).milliseconds(0);
    assert.equal(
      m.calendar(),
      m.format('dddd [gara aga na] LT'),
      'Today - ' + i + ' days beginning of day'
    );
    m.hours(23).minutes(59).seconds(59).milliseconds(999);
    assert.equal(
      m.calendar(),
      m.format('dddd [gara aga na] LT'),
      'Today - ' + i + ' days end of day'
    );
  }
});

test('calendar all else', function () {
  var weeksAgo = moment().subtract({ w: 1 }),
    weeksFromNow = moment().add({ w: 1 });

  assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
  assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

  weeksAgo = moment().subtract({ w: 2 });
  weeksFromNow = moment().add({ w: 2 });

  assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
  assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
});

test('weeks year starting sunday formatted', function () {
  assert.equal(
    moment([2012, 0, 1]).format('w ww wo'),
    '52 52 Nke 52',
    'Jan  1 2012 should be week 52'
  );
  assert.equal(
    moment([2012, 0, 2]).format('w ww wo'),
    '1 01 Nke 1',
    'Jan  2 2012 should be week 1'
  );
  assert.equal(
    moment([2012, 0, 8]).format('w ww wo'),
    '1 01 Nke 1',
    'Jan  8 2012 should be week 1'
  );
  assert.equal(
    moment([2012, 0, 9]).format('w ww wo'),
    '2 02 Nke 2',
    'Jan  9 2012 should be week 2'
  );
  assert.equal(
    moment([2012, 0, 15]).format('w ww wo'),
    '2 02 Nke 2',
    'Jan 15 2012 should be week 2'
  );
});
