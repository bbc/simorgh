import moment from 'moment';
import './gu';

moment.locale('gu');

// This asset overrides the gunit assertion done in the moment codebase.
// Format and styling of this file has been keep consistent with the official moment tests.
// An example of these tests can be seen at https://github.com/moment/moment/blob/develop/src/test/locale/en-gb.js
const assert = { equal: (val1, val2) => expect(val1).toEqual(val2) };

test('parse', () => {
  const tests =
    'જાન્યુઆરી જાન્યુ._ફેબ્રુઆરી ફેબ્રુ._માર્ચ માર્ચ_એપ્રિલ એપ્રિ._મે મે_જૂન જૂન_જુલાઈ જુલા._ઓગસ્ટ ઑગ._સપ્ટેમ્બર સપ્ટે._ઑક્ટોબર ઑક્ટ્._નવેમ્બર નવે._ડિસેમ્બર ડિસે..'.split(
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

test('format', () => {
  const a = [
    [
      'dddd, Do MMMM YYYY, a h:mm:ss વાગ્યે',
      'રવિવાર, 14 ફેબ્રુઆરી 2010, બપોર 3:25:50 વાગ્યે',
    ],
    ['ddd, a h વાગ્યે', 'રવિ, બપોર 3 વાગ્યે'],
    ['M Mo MM MMMM MMM', '2 2 02 ફેબ્રુઆરી ફેબ્રુ.'],
    ['YYYY YY', '2010 10'],
    ['D Do DD', '14 14 14'],
    ['d do dddd ddd dd', '0 0 રવિવાર રવિ ર'],
    ['DDD DDDo DDDD', '45 45 045'],
    ['w wo ww', '8 8 08'],
    ['h hh', '3 03'],
    ['H HH', '15 15'],
    ['m mm', '25 25'],
    ['s ss', '50 50'],
    ['a A', 'બપોર બપોર'],
    ['LTS', 'બપોર 3:25:50 વાગ્યે'],
    ['L', '14/02/2010'],
    ['LL', '14 ફેબ્રુઆરી 2010'],
    ['LLL', '14 ફેબ્રુઆરી 2010, બપોર 3:25 વાગ્યે'],
    ['LLLL', 'રવિવાર, 14 ફેબ્રુઆરી 2010, બપોર 3:25 વાગ્યે'],
    ['l', '14/2/2010'],
    ['ll', '14 ફેબ્રુ. 2010'],
    ['lll', '14 ફેબ્રુ. 2010, બપોર 3:25 વાગ્યે'],
    ['llll', 'રવિ, 14 ફેબ્રુ. 2010, બપોર 3:25 વાગ્યે'],
  ];
  const b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
  let i;
  for (i = 0; i < a.length; i += 1) {
    assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
  }
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
    'જાન્યુઆરી જાન્યુ._ફેબ્રુઆરી ફેબ્રુ._માર્ચ માર્ચ_એપ્રિલ એપ્રિ._મે મે_જૂન જૂન_જુલાઈ જુલા._ઓગસ્ટ ઑગ._સપ્ટેમ્બર સપ્ટે._ઑક્ટોબર ઑક્ટ્._નવેમ્બર નવે._ડિસેમ્બર ડિસે.'.split(
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
    'રવિવાર રવિ ર_સોમવાર સોમ સો_મંગળવાર મંગળ મં_બુધ્વાર બુધ્ બુ_ગુરુવાર ગુરુ ગુ_શુક્રવાર શુક્ર શુ_શનિવાર શનિ શ'.split(
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
    'અમુક પળો',
    '44 seconds = a few seconds'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
    'એક મિનિટ',
    '45 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
    'એક મિનિટ',
    '89 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
    '2 મિનિટ',
    '90 seconds = 2 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
    '44 મિનિટ',
    '44 minutes = 44 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
    'એક કલાક',
    '45 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
    'એક કલાક',
    '89 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
    '2 કલાક',
    '90 minutes = 2 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
    '5 કલાક',
    '5 hours = 5 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
    '21 કલાક',
    '21 hours = 21 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
    'એક દિવસ',
    '22 hours = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
    'એક દિવસ',
    '35 hours = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
    '2 દિવસ',
    '36 hours = 2 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
    'એક દિવસ',
    '1 day = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
    '5 દિવસ',
    '5 days = 5 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
    '25 દિવસ',
    '25 days = 25 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
    'એક મહિનો',
    '26 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
    'એક મહિનો',
    '30 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
    'એક મહિનો',
    '43 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
    '2 મહિનો',
    '46 days = 2 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
    '2 મહિનો',
    '75 days = 2 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
    '3 મહિનો',
    '76 days = 3 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
    'એક મહિનો',
    '1 month = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
    '5 મહિનો',
    '5 months = 5 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
    'એક વર્ષ',
    '345 days = a year'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
    '2 વર્ષ',
    '548 days = 2 years'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
    'એક વર્ષ',
    '1 year = a year'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
    '5 વર્ષ',
    '5 years = 5 years'
  );
});

test('suffix', () => {
  assert.equal(moment(30000).from(0), 'અમુક પળો મા', 'prefix');
  assert.equal(moment(0).from(30000), 'અમુક પળો પહેલા', 'suffix');
});

test('now from now', () => {
  assert.equal(
    moment().fromNow(),
    'અમુક પળો પહેલા',
    'now from now should display as in the past'
  );
});

test('fromNow', () => {
  assert.equal(moment().add({ s: 30 }).fromNow(), 'અમુક પળો મા', 'અમુક પળો મા');
  assert.equal(moment().add({ d: 5 }).fromNow(), '5 દિવસ મા', '5 દિવસ મા');
});

test('calendar day', () => {
  const a = moment().hours(2).minutes(0).seconds(0);

  assert.equal(
    moment(a).calendar(),
    'આજ રાત 2:00 વાગ્યે',
    'today at the same time'
  );
  assert.equal(
    moment(a).add({ m: 25 }).calendar(),
    'આજ રાત 2:25 વાગ્યે',
    'Now plus 25 min'
  );
  assert.equal(
    moment(a).add({ h: 3 }).calendar(),
    'આજ સવાર 5:00 વાગ્યે',
    'Now plus 3 hour'
  );
  assert.equal(
    moment(a).add({ d: 1 }).calendar(),
    'કાલે રાત 2:00 વાગ્યે',
    'tomorrow at the same time'
  );
  assert.equal(
    moment(a).subtract({ h: 1 }).calendar(),
    'આજ રાત 1:00 વાગ્યે',
    'Now minus 1 hour'
  );
  assert.equal(
    moment(a).subtract({ d: 1 }).calendar(),
    'ગઇકાલે રાત 2:00 વાગ્યે',
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
      m.format('[પાછલા] dddd[,] LT'),
      `Today - ${i} days current time`
    );
    m.hours(0).minutes(0).seconds(0).milliseconds(0);
    assert.equal(
      m.calendar(),
      m.format('[પાછલા] dddd[,] LT'),
      `Today - ${i} days beginning of day`
    );
    m.hours(23).minutes(59).seconds(59).milliseconds(999);
    assert.equal(
      m.calendar(),
      m.format('[પાછલા] dddd[,] LT'),
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
  assert.equal(moment([2011, 2, 23, 2, 30]).format('a'), 'રાત', 'before dawn');
  assert.equal(moment([2011, 2, 23, 9, 30]).format('a'), 'સવાર', 'morning');
  assert.equal(moment([2011, 2, 23, 14, 30]).format('a'), 'બપોર', 'during day');
  assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), 'સાંજ', 'evening');
  assert.equal(
    moment([2011, 2, 23, 19, 30]).format('a'),
    'સાંજ',
    'late evening'
  );
  assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'રાત', 'night');

  assert.equal(moment([2011, 2, 23, 2, 30]).format('A'), 'રાત', 'before dawn');
  assert.equal(moment([2011, 2, 23, 9, 30]).format('A'), 'સવાર', 'morning');
  assert.equal(
    moment([2011, 2, 23, 14, 30]).format('A'),
    'બપોર',
    ' during day'
  );
  assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), 'સાંજ', 'evening');
  assert.equal(
    moment([2011, 2, 23, 19, 30]).format('A'),
    'સાંજ',
    'late evening'
  );
  assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'રાત', 'night');
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
