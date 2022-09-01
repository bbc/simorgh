import moment from 'moment';
import './mr';

moment.locale('mr');

// This asset overrides the gunit assertion done in the moment codebase.
// Format and styling of this file has been keep consistent with the official moment tests.
// An example of these tests can be seen at https://github.com/moment/moment/blob/develop/src/test/locale/en-gb.js
const assert = { equal: (val1, val2) => expect(val1).toEqual(val2) };

test('parse', () => {
  const tests =
    'जानेवारी जाने._फेब्रुवारी फेब्रु._मार्च मार्च._एप्रिल एप्रि._मे मे._जून जून._जुलै जुलै._ऑगस्ट ऑग._सप्टेंबर सप्टें._ऑक्टोबर ऑक्टो._नोव्हेंबर नोव्हें._डिसेंबर डिसें.'.split(
      '_'
    );

  function equalTest(input, mmm, i) {
    assert.equal(
      moment(input, mmm).month(),
      i,
      `${input} should be month ${i + 1}`
    );
  }

  let i;
  for (i = 0; i < 12; i += 1) {
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

const a = [
  [
    'dddd, Do MMMM YYYY, a h:mm:ss वाजता',
    'रविवार, 14 फेब्रुवारी 2010, दुपारी 3:25:50 वाजता',
  ],
  ['ddd, a h वाजता', 'रवि, दुपारी 3 वाजता'],
  ['M Mo MM MMMM MMM', '2 2 02 फेब्रुवारी फेब्रु.'],
  ['YYYY YY', '2010 10'],
  ['D Do DD', '14 14 14'],
  ['d do dddd ddd dd', '0 0 रविवार रवि र'],
  ['DDD DDDo DDDD', '45 45 045'],
  ['w wo ww', '8 8 08'],
  ['h hh', '3 03'],
  ['H HH', '15 15'],
  ['m mm', '25 25'],
  ['s ss', '50 50'],
  ['a A', 'दुपारी दुपारी'],
  ['LTS', 'दुपारी 3:25:50 वाजता'],
  ['L', '14/02/2010'],
  ['LL', '14 फेब्रुवारी 2010'],
  ['LLL', '14 फेब्रुवारी 2010, दुपारी 3:25 वाजता'],
  ['LLLL', 'रविवार, 14 फेब्रुवारी 2010, दुपारी 3:25 वाजता'],
  ['l', '14/2/2010'],
  ['ll', '14 फेब्रु. 2010'],
  ['lll', '14 फेब्रु. 2010, दुपारी 3:25 वाजता'],
  ['llll', 'रवि, 14 फेब्रु. 2010, दुपारी 3:25 वाजता'],
];

test.each(a)('format %s', (formatString, expectedDate) => {
  const b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
  assert.equal(
    b.format(formatString),
    expectedDate,
    `${formatString} ---> ${expectedDate}`
  );
});

test('format ordinal', () => {
  assert.equal(moment([2011, 0, 1]).format('DDDo'), '1', '1');
  assert.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2');
  assert.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3');
  assert.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4');
  assert.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5');
  assert.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6');
  assert.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7');
  assert.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8');
  assert.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9');
  assert.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10');

  assert.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11');
  assert.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12');
  assert.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13');
  assert.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14');
  assert.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15');
  assert.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16');
  assert.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17');
  assert.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18');
  assert.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19');
  assert.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20');

  assert.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21');
  assert.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22');
  assert.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23');
  assert.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24');
  assert.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25');
  assert.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26');
  assert.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27');
  assert.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28');
  assert.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29');
  assert.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30');

  assert.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31');
});

test('format month', () => {
  const expected =
    'जानेवारी जाने._फेब्रुवारी फेब्रु._मार्च मार्च._एप्रिल एप्रि._मे मे._जून जून._जुलै जुलै._ऑगस्ट ऑग._सप्टेंबर सप्टें._ऑक्टोबर ऑक्टो._नोव्हेंबर नोव्हें._डिसेंबर डिसें.'.split(
      '_'
    );
  let i;
  for (i = 0; i < expected.length; i += 1) {
    assert.equal(
      moment([2011, i, 1]).format('MMMM MMM'),
      expected[i],
      expected[i]
    );
  }
});

test('format week', () => {
  const expected =
    'रविवार रवि र_सोमवार सोम सो_मंगळवार मंगळ मं_बुधवार बुध बु_गुरूवार गुरू गु_शुक्रवार शुक्र शु_शनिवार शनि श'.split(
      '_'
    );
  let i;
  for (i = 0; i < expected.length; i += 1) {
    assert.equal(
      moment([2011, 0, 2 + i]).format('dddd ddd dd'),
      expected[i],
      expected[i]
    );
  }
});

test('from', () => {
  const start = moment([2007, 1, 28]);
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
    'काही सेकंद',
    '44 seconds = a few seconds'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
    '1 मिनिटा',
    '45 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
    '1 मिनिटा',
    '89 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
    '2 मिनिटां',
    '90 seconds = 2 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
    '44 मिनिटां',
    '44 minutes = 44 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
    '1 तासा',
    '45 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
    '1 तासा',
    '89 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
    '2 तासां',
    '90 minutes = 2 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
    '5 तासां',
    '5 hours = 5 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
    '21 तासां',
    '21 hours = 21 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
    'एक दिवस',
    '22 hours = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
    'एक दिवस',
    '35 hours = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
    '2 दिवस',
    '36 hours = 2 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
    'एक दिवस',
    '1 day = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
    '5 दिवस',
    '5 days = 5 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
    '25 दिवस',
    '25 days = 25 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
    'एक महिना',
    '26 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
    'एक महिना',
    '30 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
    'एक महिना',
    '43 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
    '2 महिने',
    '46 days = 2 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
    '2 महिने',
    '75 days = 2 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
    '3 महिने',
    '76 days = 3 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
    'एक महिना',
    '1 month = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
    '5 महिने',
    '5 months = 5 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
    'एक वर्ष',
    '345 days = a year'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
    '2 वर्षे',
    '548 days = 2 years'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
    'एक वर्ष',
    '1 year = a year'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
    '5 वर्षे',
    '5 years = 5 years'
  );
});

test('suffix', () => {
  assert.equal(moment(30000).from(0), 'काही सेकंदांमध्ये', 'prefix');
  assert.equal(moment(0).from(30000), 'काही सेकंदांपूर्वी', 'suffix');
});

test('now from now', () => {
  assert.equal(
    moment().fromNow(),
    'काही सेकंदांपूर्वी',
    'now from now should display as in the past'
  );
});

test('fromNow', () => {
  assert.equal(
    moment().add({ s: 30 }).fromNow(),
    'काही सेकंदांमध्ये',
    'in a few seconds'
  );
  assert.equal(moment().add({ d: 5 }).fromNow(), '5 दिवसांमध्ये', 'in 5 days');
});

test('calendar day', () => {
  const calendarTime = moment().hours(12).minutes(0).seconds(0);

  assert.equal(
    moment(calendarTime).calendar(),
    'आज दुपारी 12:00 वाजता',
    'today at the same time'
  );
  assert.equal(
    moment(calendarTime).add({ m: 25 }).calendar(),
    'आज दुपारी 12:25 वाजता',
    'Now plus 25 min'
  );
  assert.equal(
    moment(calendarTime).add({ h: 3 }).calendar(),
    'आज दुपारी 3:00 वाजता',
    'Now plus 3 hours'
  );
  assert.equal(
    moment(calendarTime).add({ d: 1 }).calendar(),
    'उद्या दुपारी 12:00 वाजता',
    'tomorrow at the same time'
  );
  assert.equal(
    moment(calendarTime).subtract({ h: 1 }).calendar(),
    'आज सकाळी 11:00 वाजता',
    'Now minus 1 hour'
  );
  assert.equal(
    moment(calendarTime).subtract({ d: 1 }).calendar(),
    'काल दुपारी 12:00 वाजता',
    'yesterday at the same time'
  );
});

test('calendar next week', () => {
  let i;
  let m;
  for (i = 2; i < 7; i += 1) {
    m = moment().add({ d: i });
    assert.equal(
      m.calendar(),
      m.format('dddd[,] LT'),
      `Today + ${i} days current time`
    );
    m.hours(0).minutes(0).seconds(0).milliseconds(0);
    assert.equal(
      m.calendar(),
      m.format('dddd[,] LT'),
      `Today + ${i} days beginning of day`
    );
    m.hours(23).minutes(59).seconds(59).milliseconds(999);
    assert.equal(
      m.calendar(),
      m.format('dddd[,] LT'),
      `Today + ${i} days end of day`
    );
  }
});

test('calendar last week', () => {
  let i;
  let m;

  for (i = 2; i < 7; i += 1) {
    m = moment().subtract({ d: i });
    assert.equal(
      m.calendar(),
      m.format('[मागील] dddd[,] LT'),
      `Today - ${i} days current time`
    );
    m.hours(0).minutes(0).seconds(0).milliseconds(0);
    assert.equal(
      m.calendar(),
      m.format('[मागील] dddd[,] LT'),
      `Today - ${i} days beginning of day`
    );
    m.hours(23).minutes(59).seconds(59).milliseconds(999);
    assert.equal(
      m.calendar(),
      m.format('[मागील] dddd[,] LT'),
      `Today - ${i} days end of day`
    );
  }
});

test('calendar all else', () => {
  let weeksAgo = moment().subtract({ w: 1 });
  let weeksFromNow = moment().add({ w: 1 });

  assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
  assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

  weeksAgo = moment().subtract({ w: 2 });
  weeksFromNow = moment().add({ w: 2 });

  assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
  assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
});

test('meridiem', () => {
  assert.equal(
    moment([2011, 2, 23, 2, 30]).format('a'),
    'पहाटे',
    'before dawn'
  );
  assert.equal(moment([2011, 2, 23, 9, 30]).format('a'), 'सकाळी', 'morning');
  assert.equal(
    moment([2011, 2, 23, 14, 30]).format('a'),
    'दुपारी',
    'during day'
  );
  assert.equal(
    moment([2011, 2, 23, 17, 30]).format('a'),
    'सायंकाळी',
    'evening'
  );
  assert.equal(
    moment([2011, 2, 23, 19, 30]).format('a'),
    'सायंकाळी',
    'late evening'
  );
  assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'रात्री', 'night');

  assert.equal(
    moment([2011, 2, 23, 2, 30]).format('A'),
    'पहाटे',
    'before dawn'
  );
  assert.equal(moment([2011, 2, 23, 9, 30]).format('A'), 'सकाळी', 'morning');
  assert.equal(
    moment([2011, 2, 23, 14, 30]).format('A'),
    'दुपारी',
    ' during day'
  );
  assert.equal(
    moment([2011, 2, 23, 17, 30]).format('A'),
    'सायंकाळी',
    'evening'
  );
  assert.equal(
    moment([2011, 2, 23, 19, 30]).format('A'),
    'सायंकाळी',
    'late evening'
  );
  assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'रात्री', 'night');
});

test('weeks year starting sunday formatted', () => {
  assert.equal(
    moment([2012, 0, 1]).format('w ww wo'),
    '1 01 1',
    'Jan  1 2012 should be week 1'
  );
  assert.equal(
    moment([2012, 0, 7]).format('w ww wo'),
    '1 01 1',
    'Jan  7 2012 should be week 1'
  );
  assert.equal(
    moment([2012, 0, 8]).format('w ww wo'),
    '2 02 2',
    'Jan  8 2012 should be week 2'
  );
  assert.equal(
    moment([2012, 0, 14]).format('w ww wo'),
    '2 02 2',
    'Jan 14 2012 should be week 2'
  );
  assert.equal(
    moment([2012, 0, 15]).format('w ww wo'),
    '3 03 3',
    'Jan 15 2012 should be week 3'
  );
});
