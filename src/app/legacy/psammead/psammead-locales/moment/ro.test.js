import moment from 'moment';
import './ro';

moment.locale('ro');

const assert = { equal: (val1, val2) => expect(val1).toEqual(val2) };

test('parse', () => {
  const tests =
    'Ianuarie Ian._Februarie Feb._Martie Mar._Aprilie Apr._Mai Mai_Iunie Iun._Iulie Iul._August Aug._Septembrie Sept._Octombrie Oct._Noiembrie Noi._Decembrie Dec.'.split(
      '_'
    );

  function equalTest(input, format, monthIndex) {
    assert.equal(
      moment(input, format).month(),
      monthIndex,
      `${input} should be month ${monthIndex + 1}`
    );
  }

  for (let i = 0; i < 12; i += 1) {
    const [full, short] = tests[i].split(' ');
    equalTest(full, 'MMMM', i);
    equalTest(short, 'MMM', i);
  }
});

test('format', () => {
  const a = [
    ['dddd, Do MMMM YYYY, HH:mm:ss', 'duminică, 14 februarie 2010, 15:25:50'],
    ['ddd, h A', 'dum., 3 PM'],
    ['M Mo MM MMMM MMM', '2 2 02 februarie Feb.'],
    ['YYYY YY', '2010 10'],
    ['D Do DD', '14 14 14'],
    ['d do dddd ddd dd', '0 0 duminică dum. D'],
    ['DDD DDDo DDDD', '45 45 045'],
    ['w wo ww', '6 6 06'],
    ['h hh', '3 03'],
    ['H HH', '15 15'],
    ['m mm', '25 25'],
    ['s ss', '50 50'],
    ['a A', 'pm PM'],
    ['[a] DDDo [zi a anului]', 'a 45 zi a anului'],
    ['LTS', '15:25:50'],
    ['L', '14.02.2010'],
    ['LL', '14 februarie 2010'],
    ['LLL', '14 februarie 2010, 15:25'],
    ['LLLL', 'duminică, 14 februarie 2010, 15:25'],
  ];

  const b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
  a.forEach(([format, expected]) => {
    assert.equal(b.format(format), expected, `${format} ---> ${expected}`);
  });
});

test('from', () => {
  const start = moment([2007, 1, 28]);
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
    'câteva secunde',
    '44 seconds = a few seconds'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
    'un minut',
    '45 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 5 }), true),
    '5 minute',
    '5 minutes = 5 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 1 }), true),
    'o oră',
    '1 hour = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
    'o zi',
    '1 day = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
    'o lună',
    '1 month = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
    'un an',
    '1 year = a year'
  );
});

test('suffix', () => {
  assert.equal(moment(30000).from(0), 'peste câteva secunde', 'prefix');
  assert.equal(moment(0).from(30000), 'câteva secunde în urmă', 'suffix');
});

test('now from now', () => {
  assert.equal(
    moment().fromNow(),
    'câteva secunde în urmă',
    'now from now should display as in the past'
  );
});

test('calendar day', () => {
  const a = moment().hours(12).minutes(0).seconds(0);
  assert.equal(moment(a).calendar(), 'azi la 12:00', 'today at the same time');
  assert.equal(
    moment(a).add({ d: 1 }).calendar(),
    'mâine la 12:00',
    'tomorrow at the same time'
  );
  assert.equal(
    moment(a).subtract({ d: 1 }).calendar(),
    'ieri la 12:00',
    'yesterday at the same time'
  );
});
